import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import type { UseStockComparisonQueryParams } from "@/modules/stock-comparison/api/hooks/queries/useStockComparisonQuery";
import { useStockComparisonQuery } from "@/modules/stock-comparison/api/hooks/queries/useStockComparisonQuery";
import {
  StockComparisonContainer,
  StockComparisonContainerSkeleton,
} from "@/modules/stock-comparison/components/containers/stock-comparison-container";
import { isAxiosError } from "axios";

interface StockComparisonFetcherProps {
  params: UseStockComparisonQueryParams;
}

export function StockComparisonFetcher({ params }: StockComparisonFetcherProps) {
  const stockQuery = useStockComparisonQuery(params);

  if (stockQuery.isLoading && !stockQuery.data) {
    return <StockComparisonContainerSkeleton />;
  }

  if (
    stockQuery.isError &&
    isAxiosError(stockQuery.error) &&
    stockQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Аналоги для обраної пари конкурент / виробник не знайдено" />
    );
  }

  if (stockQuery.isError) {
    return (
      <ErrorDisplay
        error={stockQuery.error}
        title="Помилка завантаження даних залишків"
        description="Не вдалося завантажити дані для порівняння залишків"
        onRetry={() => void stockQuery.refetch()}
        variant="compact"
      />
    );
  }

  const days = stockQuery.data?.data?.days ?? [];

  if (!days.length) {
    return <LoadingNoData description="Немає даних про залишки за обраний період" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={stockQuery.isFetching}
      isLoading={stockQuery.isLoading}
    >
      <StockComparisonContainer data={stockQuery.data!} />
    </DataRefetchOverlay>
  );
}
