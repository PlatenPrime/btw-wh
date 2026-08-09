import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuSkugrSkusSalesQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSkugrSkusSalesQuery";
import {
  SkuStatisticsSkugrContainer,
  SkuStatisticsSkugrContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-statistics-skugr-container";
import { isAxiosError } from "axios";

interface SkuStatisticsSkugrFetcherProps {
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  konk?: string;
  prod?: string;
}

export function SkuStatisticsSkugrFetcher({
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkugrFetcherProps) {
  const skusQuery = useSkuSkugrSkusSalesQuery({
    skugrId,
    dateFrom,
    dateTo,
  });

  if (skusQuery.isLoading && !skusQuery.data) {
    return <SkuStatisticsSkugrContainerSkeleton />;
  }

  if (
    skusQuery.isError &&
    !skusQuery.data &&
    isAxiosError(skusQuery.error) &&
    skusQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Товарну групу не знайдено або немає SKU" />
    );
  }

  if (skusQuery.isError && !skusQuery.data) {
    return (
      <ErrorDisplay
        error={skusQuery.error}
        title="Помилка завантаження товарів"
        description="Не вдалося завантажити дані для таблиці"
        onRetry={() => void skusQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!skusQuery.data?.data?.length) {
    return (
      <LoadingNoData description="Немає даних про продажі товарів за обраний період" />
    );
  }

  return (
    <DataRefetchOverlay
      isFetching={skusQuery.isFetching}
      isLoading={skusQuery.isLoading}
      busyLabel="Оновлення товарів…"
      className="rounded-xl"
    >
      <SkuStatisticsSkugrContainer
        data={skusQuery.data}
        skugrId={skugrId}
        dateFrom={dateFrom}
        dateTo={dateTo}
        konk={konk}
        prod={prod}
      />
    </DataRefetchOverlay>
  );
}
