import { isAirCaptureExtensionAvailable } from "@/lib/air-capture";
import { useFillAirClientSkugrPageMutation } from "@/modules/skugrs/api/hooks/mutations/useFillAirClientSkugrPageMutation";
import type { FillSkugrSkusStats } from "@/modules/skugrs/api/types";
import { EMPTY_FILL_SKUGR_SKUS_STATS } from "@/modules/skugrs/api/types";
import type { AirClientSkugrRowStatus } from "@/modules/skugrs/types/air-client-skugr-fill";
import { runAirSkugrFillPages } from "@/modules/skugrs/utils/runAirSkugrFillPages";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface AirSkugrFillPageLogEntry {
  pageIndex: number;
  pageUrl: string;
  productsOnPage: number;
  clientNextPageUrl: string | null;
  serverNextPageUrl: string | null;
}

export interface AirSkugrSingleFillState {
  status: AirClientSkugrRowStatus;
  pageIndex: number;
  pageUrl?: string;
  productsOnPage?: number;
  clientNextPageUrl?: string | null;
  serverNextPageUrl?: string | null;
  stats: FillSkugrSkusStats;
  pages: AirSkugrFillPageLogEntry[];
  message?: string;
  code?: string;
}

const IDLE_STATE: AirSkugrSingleFillState = {
  status: "pending",
  pageIndex: 0,
  stats: EMPTY_FILL_SKUGR_SKUS_STATS,
  pages: [],
};

export function useAirSkugrSingleFill(
  group: {
    skugrId: string;
    url: string;
    title?: string;
  },
  options: { enabled?: boolean } = {},
) {
  const queryClient = useQueryClient();
  const fillMutation = useFillAirClientSkugrPageMutation();
  const enabled = options.enabled ?? true;

  const [isRunning, setIsRunning] = useState(false);
  const [extensionAvailable, setExtensionAvailable] = useState<boolean | null>(
    null,
  );
  const [state, setState] = useState<AirSkugrSingleFillState>(IDLE_STATE);

  const stopRef = useRef(false);
  const runIdRef = useRef(0);

  const checkExtension = useCallback(async () => {
    setExtensionAvailable(null);
    const available = await isAirCaptureExtensionAvailable();
    setExtensionAvailable(available);
    return available;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void checkExtension();
  }, [checkExtension, enabled]);

  const reset = useCallback(() => {
    runIdRef.current += 1;
    stopRef.current = true;
    setIsRunning(false);
    setState(IDLE_STATE);
  }, []);

  const run = useCallback(async () => {
    if (isRunning) return;

    const available = await checkExtension();
    if (!available) {
      toast.error("Розширення не підключено", {
        description:
          "Встановіть BTW Air Capture (Load unpacked) і оновіть сторінку.",
      });
      return;
    }

    if (!group.url) {
      toast.error("У групи немає URL лістингу");
      return;
    }

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    stopRef.current = false;
    setIsRunning(true);
    setState({
      status: "capturing",
      pageIndex: 0,
      stats: EMPTY_FILL_SKUGR_SKUS_STATS,
      pages: [],
    });

    const result = await runAirSkugrFillPages({
      group: { skugrId: group.skugrId, url: group.url },
      fillPage: fillMutation.mutateAsync,
      shouldStop: () => stopRef.current || runIdRef.current !== runId,
      onProgress: (progress) => {
        if (runIdRef.current !== runId) return;
        setState((curr) => {
          const next: AirSkugrSingleFillState = {
            ...curr,
            status: progress.phase,
            pageIndex: progress.pageIndex,
            pageUrl: progress.pageUrl,
            productsOnPage: progress.productsOnPage ?? curr.productsOnPage,
            stats: progress.stats ?? curr.stats,
            clientNextPageUrl:
              progress.clientNextPageUrl !== undefined
                ? progress.clientNextPageUrl
                : curr.clientNextPageUrl,
            serverNextPageUrl:
              progress.serverNextPageUrl !== undefined
                ? progress.serverNextPageUrl
                : curr.serverNextPageUrl,
          };

          if (
            progress.stats &&
            typeof progress.productsOnPage === "number"
          ) {
            const entry: AirSkugrFillPageLogEntry = {
              pageIndex: progress.pageIndex,
              pageUrl: progress.pageUrl,
              productsOnPage: progress.productsOnPage,
              clientNextPageUrl: progress.clientNextPageUrl ?? null,
              serverNextPageUrl: progress.serverNextPageUrl ?? null,
            };
            const pages = curr.pages.filter(
              (page) => page.pageIndex !== progress.pageIndex,
            );
            pages.push(entry);
            pages.sort((a, b) => a.pageIndex - b.pageIndex);
            next.pages = pages;
          }

          return next;
        });
      },
    });

    if (runIdRef.current !== runId) return;

    setIsRunning(false);
    queryClient.invalidateQueries({ queryKey: ["skugrs"] });
    queryClient.invalidateQueries({ queryKey: ["skugrs", "id", group.skugrId] });
    queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });

    if (result.status === "completed") {
      setState((curr) => ({
        ...curr,
        status: "done",
        pageIndex: result.pagesFilled,
        stats: result.stats,
      }));
      toast.success("Групу заповнено з клієнта", {
        description: `Сторінок: ${result.pagesFilled}, створено: ${result.stats.created}, додано існуючих: ${result.stats.linkedExisting}`,
      });
      return;
    }

    if (result.status === "stopped") {
      setState((curr) => ({
        ...curr,
        status: "pending",
        pageIndex: result.pagesFilled,
        stats: result.stats,
      }));
      return;
    }

    setState((curr) => ({
      ...curr,
      status: "error",
      pageIndex: result.pagesFilled,
      stats: result.stats,
      code: result.code,
      message: result.message,
    }));
    toast.error(group.title ? `${group.title}: помилка refill` : "Помилка refill", {
      description: result.message,
    });
  }, [
    checkExtension,
    fillMutation.mutateAsync,
    group.skugrId,
    group.title,
    group.url,
    isRunning,
    queryClient,
  ]);

  const stop = useCallback(() => {
    stopRef.current = true;
  }, []);

  return {
    state,
    isRunning,
    extensionAvailable,
    run,
    stop,
    reset,
    recheckExtension: checkExtension,
  };
}
