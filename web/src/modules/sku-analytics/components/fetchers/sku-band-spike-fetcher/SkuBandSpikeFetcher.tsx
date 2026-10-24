import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useDiscoverBandSpikeQuery } from "@/modules/sku-analytics/api/hooks/queries/useDiscoverBandSpikeQuery";
import {
  SkuBandSpikeContainer,
  SkuBandSpikeContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-band-spike-container";
import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export interface SkuBandSpikeFetcherProps {
  konkName: string;
  stockMin: number;
  stockMax: number;
  dateFrom: string;
  dateTo: string;
}

function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string" &&
      data.message
    ) {
      return data.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Невідома помилка";
}

export function SkuBandSpikeFetcher({
  konkName,
  stockMin,
  stockMax,
  dateFrom,
  dateTo,
}: SkuBandSpikeFetcherProps) {
  const discoverQuery = useDiscoverBandSpikeQuery({
    konkName,
    stockMin,
    stockMax,
    dateFrom,
    dateTo,
    enabled: true,
  });
  const toastedErrorRef = useRef<unknown>(null);

  useEffect(() => {
    if (!discoverQuery.isError) {
      toastedErrorRef.current = null;
      return;
    }

    const error = discoverQuery.error;
    if (toastedErrorRef.current === error) {
      return;
    }
    toastedErrorRef.current = error;

    if (isAxiosError(error) && error.response?.status === 500) {
      toast.error("Не вдалося знайти кандидатів band-spike", {
        description: "Спробуйте пізніше",
      });
    }
  }, [discoverQuery.isError, discoverQuery.error]);

  if (discoverQuery.isLoading && !discoverQuery.data) {
    return <SkuBandSpikeContainerSkeleton />;
  }

  if (discoverQuery.isError && !discoverQuery.data) {
    const status = isAxiosError(discoverQuery.error)
      ? discoverQuery.error.response?.status
      : undefined;
    const isValidation = status === 400;

    return (
      <ErrorDisplay
        error={getApiErrorMessage(discoverQuery.error)}
        title={
          isValidation
            ? "Помилка валідації"
            : "Помилка пошуку band-spike"
        }
        description={
          isValidation
            ? "Перевірте конкурента, смугу залишку та діапазон дат (≤ 93 дні)."
            : "Не вдалося отримати список кандидатів."
        }
        onRetry={() => void discoverQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!discoverQuery.data?.data) {
    return <LoadingNoData description="Немає даних для обраного запиту" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={discoverQuery.isFetching}
      isLoading={discoverQuery.isLoading}
    >
      <SkuBandSpikeContainer data={discoverQuery.data.data} />
    </DataRefetchOverlay>
  );
}
