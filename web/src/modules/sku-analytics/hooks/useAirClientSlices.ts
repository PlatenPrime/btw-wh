import {
  isAirCaptureExtensionAvailable,
  requestAirPageHtml,
} from "@/lib/air-capture";
import { usePutAirClientSkuSliceMutation } from "@/modules/sku-analytics/api/hooks/mutations/usePutAirClientSkuSliceMutation";
import { useAirClientPendingQuery } from "@/modules/sku-analytics/api/hooks/queries/useAirClientPendingQuery";
import type { AirClientPendingItemDto } from "@/modules/sku-analytics/api/types";
import type {
  AirClientRowState,
  AirClientRowStatus,
} from "@/modules/sku-analytics/types";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

/** Коди помилок backend, які варто показати оператору окремим тостом. */
const AIR_BUSINESS_ERROR_CODES = new Set([
  "URL_MISMATCH",
  "NOT_AIR",
  "NOT_SLICED",
]);

interface PutErrorBody {
  message?: string;
  code?: string;
}

function mapPutError(error: AxiosError<PutErrorBody>): AirClientRowState {
  const status = error.response?.status;
  const body = error.response?.data;
  const code = body?.code;

  if (status === 422) {
    return {
      status: "error",
      code: "UNPARSABLE_HTML",
      message: "HTML без валідних stock/price (WAF/інша верстка). Спробуйте пізніше.",
    };
  }
  if (status === 404) {
    return { status: "error", code: "NOT_FOUND", message: "SKU не знайдено." };
  }
  if (status === 400) {
    return {
      status: "error",
      code: code || "BAD_REQUEST",
      message: body?.message || "Некоректний запит.",
    };
  }
  return {
    status: "error",
    code: code || "REQUEST_FAILED",
    message: body?.message || error.message || "Помилка запиту.",
  };
}

export interface AirClientSlicesSummary {
  total: number;
  saved: number;
  skipped: number;
  error: number;
  /** Оброблено = saved + skipped. */
  done: number;
}

export function useAirClientSlices() {
  const queryClient = useQueryClient();
  const pendingQuery = useAirClientPendingQuery();
  const putMutation = usePutAirClientSkuSliceMutation();

  const [rowStates, setRowStates] = useState<Record<string, AirClientRowState>>(
    {},
  );
  const [isRunning, setIsRunning] = useState(false);
  const [extensionAvailable, setExtensionAvailable] = useState<boolean | null>(
    null,
  );

  const stopRef = useRef(false);

  const items = useMemo<AirClientPendingItemDto[]>(
    () => pendingQuery.data?.data.items ?? [],
    [pendingQuery.data],
  );
  const sliceDate = pendingQuery.data?.data.date;

  const setRowStatus = useCallback((skuId: string, state: AirClientRowState) => {
    setRowStates((curr) => ({ ...curr, [skuId]: state }));
  }, []);

  const checkExtension = useCallback(async () => {
    setExtensionAvailable(null);
    const available = await isAirCaptureExtensionAvailable();
    setExtensionAvailable(available);
    return available;
  }, []);

  useEffect(() => {
    void checkExtension();
  }, [checkExtension]);

  /** Обробляє одну позицію: capture HTML → PUT. Повертає підсумковий статус. */
  const processItem = useCallback(
    async (item: AirClientPendingItemDto): Promise<AirClientRowStatus> => {
      setRowStatus(item.skuId, { status: "capturing" });

      const capture = await requestAirPageHtml(item.url);
      if (!capture.ok || !capture.html) {
        setRowStatus(item.skuId, {
          status: "error",
          code: capture.errorCode,
          message: capture.errorMessage || "Не вдалося зняти HTML сторінки.",
        });
        return "error";
      }

      setRowStatus(item.skuId, { status: "saving" });

      try {
        const res = await putMutation.mutateAsync({
          skuId: item.skuId,
          body: { sourceUrl: item.url, html: capture.html },
        });
        const status = res.data.status;
        setRowStatus(item.skuId, { status });
        return status;
      } catch (error) {
        const mapped = mapPutError(error as AxiosError<PutErrorBody>);
        setRowStatus(item.skuId, mapped);
        if (mapped.code && AIR_BUSINESS_ERROR_CODES.has(mapped.code)) {
          toast.error(`${item.title}: ${mapped.code}`, {
            description: mapped.message,
          });
        }
        return "error";
      }
    },
    [putMutation, setRowStatus],
  );

  const invalidateSlices = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["sku-slices"] });
  }, [queryClient]);

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

    let saved = 0;
    let skipped = 0;
    let failed = 0;

    for (const item of items) {
      if (stopRef.current) break;
      const status = await processItem(item);
      if (status === "saved") saved += 1;
      else if (status === "skipped") skipped += 1;
      else failed += 1;
    }

    setIsRunning(false);
    invalidateSlices();

    if (saved > 0 || skipped > 0) {
      toast.success("Дозаповнення Air завершено", {
        description: `Записано ${saved}, пропущено ${skipped}, помилок ${failed}.`,
      });
    } else if (failed > 0) {
      toast.error("Дозаповнення Air: помилки", {
        description: `Не вдалося обробити ${failed} позицій. Спробуйте пізніше.`,
      });
    }
  }, [checkExtension, invalidateSlices, isRunning, items, processItem]);

  const stop = useCallback(() => {
    stopRef.current = true;
  }, []);

  const retryItem = useCallback(
    async (skuId: string) => {
      if (isRunning) return;
      const item = items.find((it) => it.skuId === skuId);
      if (!item) return;

      const available = await checkExtension();
      if (!available) {
        toast.error("Розширення не підключено");
        return;
      }

      setIsRunning(true);
      const status = await processItem(item);
      setIsRunning(false);
      invalidateSlices();

      if (status === "saved") {
        toast.success(`${item.title}: записано`);
      } else if (status === "skipped") {
        toast.info(`${item.title}: вже було валідне значення`);
      }
    },
    [checkExtension, invalidateSlices, isRunning, items, processItem],
  );

  const refreshQueue = useCallback(() => {
    setRowStates({});
    void pendingQuery.refetch();
  }, [pendingQuery]);

  const summary = useMemo<AirClientSlicesSummary>(() => {
    let saved = 0;
    let skipped = 0;
    let error = 0;
    for (const item of items) {
      const status = rowStates[item.skuId]?.status;
      if (status === "saved") saved += 1;
      else if (status === "skipped") skipped += 1;
      else if (status === "error") error += 1;
    }
    return {
      total: items.length,
      saved,
      skipped,
      error,
      done: saved + skipped,
    };
  }, [items, rowStates]);

  return {
    items,
    sliceDate,
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
