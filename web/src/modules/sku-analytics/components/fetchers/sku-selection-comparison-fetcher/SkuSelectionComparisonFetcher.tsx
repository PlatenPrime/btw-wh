import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuSelectionPieQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSelectionPieQuery";
import {
  SkuSelectionComparisonContainer,
  SkuSelectionComparisonContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-selection-comparison-container";
import type { SkuMultiSelectQuery } from "@/modules/skus/components/controls/sku-multi-select-control";
import { isAxiosError } from "axios";

interface SkuSelectionComparisonFetcherProps {
  skuIds: string[];
  selectAll: boolean;
  selectionQuery: SkuMultiSelectQuery;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function SkuSelectionComparisonFetcher({
  skuIds,
  selectAll,
  selectionQuery,
  dateFrom,
  dateTo,
  enabled = true,
}: SkuSelectionComparisonFetcherProps) {
  const pieQuery = useSkuSelectionPieQuery({
    skuIds,
    selectAll,
    search: selectionQuery.search,
    konkName: selectionQuery.konkName,
    prodName: selectionQuery.prodName,
    dateFrom,
    dateTo,
    enabled,
  });

  if (pieQuery.isLoading && !pieQuery.data) {
    return <SkuSelectionComparisonContainerSkeleton />;
  }

  if (
    pieQuery.isError &&
    !pieQuery.data &&
    isAxiosError(pieQuery.error) &&
    pieQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Обрані SKU не знайдені або немає даних за період" />
    );
  }

  if (pieQuery.isError && !pieQuery.data) {
    return (
      <ErrorDisplay
        error={pieQuery.error}
        title="Помилка завантаження порівняння"
        description="Не вдалося завантажити частки обраних товарів."
        onRetry={() => void pieQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!pieQuery.data?.data) {
    return (
      <LoadingNoData description="Немає даних про продажі обраних товарів" />
    );
  }

  const hasRows = Object.keys(pieQuery.data.data).length > 0;
  if (!hasRows) {
    return (
      <LoadingNoData description="Немає даних про продажі обраних товарів" />
    );
  }

  return (
    <DataRefetchOverlay
      isFetching={pieQuery.isFetching}
      isLoading={pieQuery.isLoading}
    >
      <SkuSelectionComparisonContainer
        data={pieQuery.data}
        skuIds={skuIds}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </DataRefetchOverlay>
  );
}
