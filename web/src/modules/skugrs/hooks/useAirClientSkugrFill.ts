import {
  isAirCaptureExtensionAvailable,
} from "@/lib/air-capture";
import { useFillAirClientSkugrPageMutation } from "@/modules/skugrs/api/hooks/mutations/useFillAirClientSkugrPageMutation";
import { useAirClientSkugrPendingQuery } from "@/modules/skugrs/api/hooks/queries/useAirClientSkugrPendingQuery";
import type { AirClientSkugrPendingItemDto } from "@/modules/skugrs/api/types";
import type {
  AirClientSkugrFillSummary,
  AirClientSkugrRowState,
} from "@/modules/skugrs/types/air-client-skugr-fill";
import {
  AIR_SKUGR_GROUP_JITTER_MS,
  delayMs,
  jitterMs,
} from "@/modules/skugrs/utils/airSkugrFillTiming";
import { runAirSkugrFillPages } from "@/modules/skugrs/utils/runAirSkugrFillPages";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export function useAirClientSkugrFill() {
  const queryClient = useQueryClient();
  const pendingQuery = useAirClientSkugrPendingQuery();
  const fillMutation = useFillAirClientSkugrPageMutation();

  const [rowStates, setRowStates] = useState<
    Record<string, AirClientSkugrRowState>
  >({});
  const [isRunning, setIsRunning] = useState(false);
  const [extensionAvailable, setExtensionAvailable] = useState<boolean | null>(
    null,
  );

  const stopRef = useRef(false);

  const items = useMemo<AirClientSkugrPendingItemDto[]>(
    () => pendingQuery.data?.data.items ?? [],
    [pendingQuery.data],
  );

  const setRowStatus = useCallback(
    (skugrId: string, state: AirClientSkugrRowState) => {
      setRowStates((curr) => ({ ...curr, [skugrId]: state }));
    },
    [],
  );

  const checkExtension = useCallback(async () => {
    setExtensionAvailable(null);
    const available = await isAirCaptureExtensionAvailable();
    setExtensionAvailable(available);
    return available;
  }, []);

  useEffect(() => {
    void checkExtension();
  }, [checkExtension]);

  const invalidateSkugrs = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["skugrs"] });
    queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
  }, [queryClient]);

  const processGroup = useCallback(
    async (
      group: AirClientSkugrPendingItemDto,
    ): Promise<"done" | "error" | "stopped" | "auth"> => {
      const result = await runAirSkugrFillPages({
        group: { skugrId: group.skugrId, url: group.url },
        fillPage: fillMutation.mutateAsync,
        shouldStop: () => stopRef.current,
        onProgress: ({ pageIndex, phase, productsOnPage }) => {
          setRowStatus(group.skugrId, {
            status: phase,
            pageIndex,
            productsOnPage,
          });
        },
      });

      if (result.status === "completed") {
        setRowStatus(group.skugrId, {
          status: "done",
          pageIndex: result.pagesFilled,
          stats: result.stats,
        });
        return "done";
      }

      if (result.status === "stopped") {
        setRowStatus(group.skugrId, {
          status: "pending",
          pageIndex: result.pagesFilled,
          stats: result.stats,
        });
        return "stopped";
      }

      setRowStatus(group.skugrId, {
        status: "error",
        pageIndex: result.pagesFilled,
        stats: result.stats,
        code: result.code,
        message: result.message,
      });
      if (result.stopQueue) {
        toast.error(`${group.title}: ${result.code ?? "AUTH"}`, {
          description: result.message,
        });
        return "auth";
      }
      return "error";
    },
    [fillMutation.mutateAsync, setRowStatus],
  );

  const run = useCallback(async () => {
    if (isRunning || items.length === 0) return;

    const available = await checkExtension();
    if (!available) {
      toast.error("Розширення не підключено", {
        description:
          "Встановіть BTW Air Capture (Load unpacked) і оновіть сторінку.",
      });
      return;
    }

    stopRef.current = false;
    setIsRunning(true);

    let done = 0;
    let failed = 0;

    for (let i = 0; i < items.length; i += 1) {
      if (stopRef.current) break;
      const outcome = await processGroup(items[i]);
      if (outcome === "auth") {
        failed += 1;
        break;
      }
      if (outcome === "stopped") break;
      if (outcome === "done") done += 1;
      else failed += 1;

      if (!stopRef.current && i < items.length - 1) {
        await delayMs(
          jitterMs(AIR_SKUGR_GROUP_JITTER_MS.min, AIR_SKUGR_GROUP_JITTER_MS.max),
        );
      }
    }

    setIsRunning(false);
    invalidateSkugrs();

    if (done > 0) {
      toast.success("Refill товарних груп Air завершено", {
        description: `Оновлено ${done}, помилок ${failed}.`,
      });
    } else if (failed > 0) {
      toast.error("Refill товарних груп Air: помилки", {
        description: `Не вдалося оновити ${failed} груп.`,
      });
    }
  }, [
    checkExtension,
    invalidateSkugrs,
    isRunning,
    items,
    processGroup,
  ]);

  const stop = useCallback(() => {
    stopRef.current = true;
  }, []);

  const retryItem = useCallback(
    async (skugrId: string) => {
      if (isRunning) return;
      const item = items.find((it) => it.skugrId === skugrId);
      if (!item) return;

      const available = await checkExtension();
      if (!available) {
        toast.error("Розширення не підключено");
        return;
      }

      stopRef.current = false;
      setIsRunning(true);
      const outcome = await processGroup(item);
      setIsRunning(false);
      invalidateSkugrs();

      if (outcome === "done") {
        toast.success(`${item.title}: групу оновлено`);
      }
    },
    [checkExtension, invalidateSkugrs, isRunning, items, processGroup],
  );

  const refreshQueue = useCallback(() => {
    setRowStates({});
    void pendingQuery.refetch();
  }, [pendingQuery]);

  const summary = useMemo<AirClientSkugrFillSummary>(() => {
    let done = 0;
    let error = 0;
    let created = 0;
    let linkedExisting = 0;
    for (const item of items) {
      const state = rowStates[item.skugrId];
      if (state?.status === "done") {
        done += 1;
        created += state.stats?.created ?? 0;
        linkedExisting += state.stats?.linkedExisting ?? 0;
      } else if (state?.status === "error") {
        error += 1;
        created += state.stats?.created ?? 0;
        linkedExisting += state.stats?.linkedExisting ?? 0;
      }
    }
    return {
      total: items.length,
      done,
      error,
      created,
      linkedExisting,
    };
  }, [items, rowStates]);

  return {
    items,
    rowStates,
    summary,
    isRunning,
    extensionAvailable,
    isPendingLoading: pendingQuery.isLoading,
    isPendingError: pendingQuery.isError,
    run,
    stop,
    retryItem,
    refreshQueue,
    recheckExtension: checkExtension,
  };
}
