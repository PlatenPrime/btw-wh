import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useSkuManufacturersPieQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuManufacturersPieQuery";
import {
  SkuStatisticsContainer,
  SkuStatisticsContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-statistics-container";
import { isAxiosError } from "axios";

interface SkuStatisticsFetcherProps {
  konk: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuStatisticsFetcher({
  konk,
  dateFrom,
  dateTo,
}: SkuStatisticsFetcherProps) {
  const statisticsQuery = useSkuManufacturersPieQuery({
    konk,
    dateFrom,
    dateTo,
  });

  if (statisticsQuery.isLoading && !statisticsQuery.data) {
    return <SkuStatisticsContainerSkeleton />;
  }

  if (
    statisticsQuery.isError &&
    !statisticsQuery.data &&
    isAxiosError(statisticsQuery.error) &&
    statisticsQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Немає даних для обраного конкурента і періоду" />
    );
  }

  if (statisticsQuery.isError && !statisticsQuery.data) {
    return (
      <ErrorDisplay
        error={statisticsQuery.error}
        title="Помилка завантаження статистики"
        description="Не вдалося завантажити дані для кругової діаграми."
        onRetry={() => void statisticsQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!statisticsQuery.data?.data) {
    return <LoadingNoData description="Немає даних про продажі виробників за обраний період" />;
  }

  const hasRows = Object.keys(statisticsQuery.data.data).length > 0;

  if (!hasRows) {
    return (
      <LoadingNoData description="Немає даних про продажі виробників за обраний період" />
    );
  }

  return (
    <DataRefetchOverlay
      isFetching={statisticsQuery.isFetching}
      isLoading={statisticsQuery.isLoading}
    >
      <SkuStatisticsContainer
        data={statisticsQuery.data}
        konk={konk}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </DataRefetchOverlay>
  );
}
