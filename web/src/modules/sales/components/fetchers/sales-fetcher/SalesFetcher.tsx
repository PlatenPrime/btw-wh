import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSalesComparisonQuery } from "@/modules/sales/api/hooks/queries/useSalesComparisonQuery";
import type { UseSalesComparisonQueryParams } from "@/modules/sales/api/hooks/queries/useSalesComparisonQuery";
import {
  SalesContainer,
  SalesContainerSkeleton,
} from "@/modules/sales/components/containers/sales-container";
import { isAxiosError } from "axios";

interface SalesFetcherProps {
  params: UseSalesComparisonQueryParams;
}

export function SalesFetcher({ params }: SalesFetcherProps) {
  const salesQuery = useSalesComparisonQuery(params);

  if (salesQuery.isLoading && !salesQuery.data) {
    return <SalesContainerSkeleton />;
  }

  if (
    salesQuery.isError &&
    isAxiosError(salesQuery.error) &&
    salesQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Аналоги для обраної пари конкурент / виробник не знайдено" />
    );
  }

  if (salesQuery.isError) {
    return (
      <ErrorDisplay
        error={salesQuery.error}
        title="Помилка завантаження даних продаж"
        description="Не вдалося завантажити дані для порівняння продаж"
        onRetry={() => void salesQuery.refetch()}
        variant="compact"
      />
    );
  }

  const days = salesQuery.data?.data?.days ?? [];

  if (!days.length) {
    return <LoadingNoData description="Немає даних про продажі за обраний період" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={salesQuery.isFetching}
      isLoading={salesQuery.isLoading}
    >
      <SalesContainer data={salesQuery.data!} />
    </DataRefetchOverlay>
  );
}
