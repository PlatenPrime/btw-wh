import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { SkuSelectionComparisonControls } from "@/modules/sku-analytics/components/controls/sku-selection-comparison-controls";
import { SkuSelectionComparisonFetcher } from "@/modules/sku-analytics/components/fetchers/sku-selection-comparison-fetcher";
import { useSkuSelectionComparisonParams } from "@/modules/sku-analytics/hooks/useSkuSelectionComparisonParams";
import { useSkuSelectionPieQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuSelectionPieQuery";
import { hasSkuSelection } from "@/modules/excel-jobs/utils/build-sku-selection-params";
import { typography } from "@/lib/typography";
import { useCallback } from "react";

/** Порівняння обраних товарів конкурентів (/sku/comparison/skus). */
export function SkuSelectionComparison() {
  const {
    skuIds,
    skuPicks,
    selectAll,
    selectionQuery,
    matchedTotal,
    dateFrom,
    dateTo,
    hasRun,
    setSkuPicks,
    setSelectAll,
    setSelectionQuery,
    setMatchedTotal,
    setDateRange,
    markRun,
    resetSelection,
  } = useSkuSelectionComparisonParams();

  const isFiltersReady =
    hasSkuSelection({ selectAll, pickCount: skuIds.length }) &&
    Boolean(dateFrom) &&
    Boolean(dateTo);
  const canFetch = hasRun && isFiltersReady;

  const pieQuery = useSkuSelectionPieQuery({
    skuIds,
    selectAll,
    search: selectionQuery.search,
    konkName: selectionQuery.konkName,
    prodName: selectionQuery.prodName,
    dateFrom,
    dateTo,
    enabled: canFetch,
  });

  const handleSubmit = useCallback(() => {
    if (!isFiltersReady) return;
    if (hasRun) {
      if (!pieQuery.isFetching) void pieQuery.refetch();
      return;
    }
    markRun();
  }, [isFiltersReady, hasRun, pieQuery, markRun]);

  const isFetching = canFetch && pieQuery.isFetching;

  const hint = !isFiltersReady
    ? `Оберіть товари і період${
        selectAll && matchedTotal > 0 ? ` · усі ${matchedTotal}` : ""
      }`
    : canFetch
      ? "Частки за обраною вибіркою"
      : "Натисніть «Показати», щоб завантажити";

  return (
    <div className="grid gap-4">
      <SkuSelectionComparisonControls
        skuPicks={skuPicks}
        onSkuPicksChange={setSkuPicks}
        selectAll={selectAll}
        onSelectAllChange={setSelectAll}
        onSelectionQueryChange={setSelectionQuery}
        onMatchedTotalChange={setMatchedTotal}
        onReset={resetSelection}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={setDateRange}
      />

      <SurfaceSection className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid min-w-0 gap-1">
            <p className={typography.gridTitle}>Результати</p>
            <p className={typography.pageDescription}>{hint}</p>
          </div>
          <Button
            type="button"
            variant="info"
            className="h-9 shrink-0"
            disabled={!isFiltersReady || isFetching}
            onClick={handleSubmit}
          >
            {isFetching ? "Завантаження..." : "Показати"}
          </Button>
        </div>

        {canFetch ? (
          <SkuSelectionComparisonFetcher
            skuIds={skuIds}
            selectAll={selectAll}
            selectionQuery={selectionQuery}
            dateFrom={dateFrom}
            dateTo={dateTo}
            enabled={canFetch}
          />
        ) : (
          <div className="rounded-md border border-dashed p-6 text-center">
            <p className={typography.pageDescription}>
              Тут зʼявляться діаграми та таблиця часток.
            </p>
          </div>
        )}
      </SurfaceSection>
    </div>
  );
}
