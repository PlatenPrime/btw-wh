import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuKonkProdSkugrGroupsSalesQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuKonkProdSkugrGroupsSalesQuery";
import {
  SkuStatisticsProdContainer,
  SkuStatisticsProdContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-statistics-prod-container";
import { isAxiosError } from "axios";

interface SkuStatisticsProdFetcherProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuStatisticsProdFetcher({
  konk,
  prod,
  dateFrom,
  dateTo,
}: SkuStatisticsProdFetcherProps) {
  const groupsQuery = useSkuKonkProdSkugrGroupsSalesQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
  });

  if (groupsQuery.isLoading && !groupsQuery.data) {
    return <SkuStatisticsProdContainerSkeleton />;
  }

  if (
    groupsQuery.isError &&
    !groupsQuery.data &&
    isAxiosError(groupsQuery.error) &&
    groupsQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Немає товарних груп для обраної пари конкурент / виробник" />
    );
  }

  if (groupsQuery.isError && !groupsQuery.data) {
    return (
      <ErrorDisplay
        error={groupsQuery.error}
        title="Помилка завантаження товарних груп"
        description="Не вдалося завантажити дані для діаграми та таблиці"
        onRetry={() => void groupsQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!groupsQuery.data?.data?.length) {
    return (
      <LoadingNoData description="Немає даних про продажі товарних груп за обраний період" />
    );
  }

  return (
    <DataRefetchOverlay
      isFetching={groupsQuery.isFetching}
      isLoading={groupsQuery.isLoading}
      busyLabel="Оновлення товарних груп…"
      className="rounded-xl"
    >
      <SkuStatisticsProdContainer
        data={groupsQuery.data}
        konk={konk}
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </DataRefetchOverlay>
  );
}
