import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuKonksPieQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuKonksPieQuery";
import {
  SkuComparisonContainer,
  SkuComparisonContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-comparison-container";
import { isAxiosError } from "axios";

interface SkuComparisonFetcherProps {
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuComparisonFetcher({
  prod,
  dateFrom,
  dateTo,
}: SkuComparisonFetcherProps) {
  const comparisonQuery = useSkuKonksPieQuery({
    prod,
    dateFrom,
    dateTo,
  });

  if (comparisonQuery.isLoading && !comparisonQuery.data) {
    return <SkuComparisonContainerSkeleton />;
  }

  if (
    comparisonQuery.isError &&
    !comparisonQuery.data &&
    isAxiosError(comparisonQuery.error) &&
    comparisonQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Немає даних для обраного виробника і періоду" />
    );
  }

  if (comparisonQuery.isError && !comparisonQuery.data) {
    return (
      <ErrorDisplay
        error={comparisonQuery.error}
        title="Помилка завантаження порівняння"
        description="Не вдалося завантажити дані для кругової діаграми."
        onRetry={() => void comparisonQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!comparisonQuery.data?.data) {
    return (
      <LoadingNoData description="Немає даних про продажі конкурентів за обраний період" />
    );
  }

  const hasRows = Object.keys(comparisonQuery.data.data).length > 0;

  if (!hasRows) {
    return (
      <LoadingNoData description="Немає даних про продажі конкурентів за обраний період" />
    );
  }

  return (
    <DataRefetchOverlay
      isFetching={comparisonQuery.isFetching}
      isLoading={comparisonQuery.isLoading}
    >
      <SkuComparisonContainer
        data={comparisonQuery.data}
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </DataRefetchOverlay>
  );
}
