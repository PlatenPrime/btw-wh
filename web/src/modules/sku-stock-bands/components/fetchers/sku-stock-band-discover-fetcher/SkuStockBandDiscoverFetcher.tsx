import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useDiscoverStockBandQuery } from "@/modules/sku-stock-bands/api/hooks/queries/useDiscoverStockBandQuery";
import {
  SkuStockBandDiscoverContainer,
  SkuStockBandDiscoverContainerSkeleton,
} from "@/modules/sku-stock-bands/components/containers/sku-stock-band-discover-container";
import { isAxiosError } from "axios";

interface SkuStockBandDiscoverFetcherProps {
  bandId: string;
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

export function SkuStockBandDiscoverFetcher({
  bandId,
  dateFrom,
  dateTo,
}: SkuStockBandDiscoverFetcherProps) {
  const discoverQuery = useDiscoverStockBandQuery({
    bandId,
    dateFrom,
    dateTo,
    enabled: true,
  });

  if (discoverQuery.isLoading && !discoverQuery.data) {
    return <SkuStockBandDiscoverContainerSkeleton />;
  }

  if (discoverQuery.isError && !discoverQuery.data) {
    const status = isAxiosError(discoverQuery.error)
      ? discoverQuery.error.response?.status
      : undefined;
    const isValidation = status === 400;

    return (
      <ErrorDisplay
        error={getApiErrorMessage(discoverQuery.error)}
        title={isValidation ? "Помилка валідації" : "Помилка пошуку"}
        description={
          isValidation
            ? "Перевірте діапазон дат (≤ 93 дні)."
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
      <SkuStockBandDiscoverContainer
        data={discoverQuery.data.data}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </DataRefetchOverlay>
  );
}
