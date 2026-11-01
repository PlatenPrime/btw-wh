import { SkuSelectionComparisonControls } from "@/modules/sku-analytics/components/controls/sku-selection-comparison-controls";
import { SkuSelectionComparisonFetcher } from "@/modules/sku-analytics/components/fetchers/sku-selection-comparison-fetcher";
import { useSkuSelectionComparisonParams } from "@/modules/sku-analytics/hooks/useSkuSelectionComparisonParams";

/** Порівняння обраних товарів конкурентів (/sku/comparison/skus). */
export function SkuSelectionComparison() {
  const {
    skuIds,
    skuPicks,
    dateFrom,
    dateTo,
    setSkuPicks,
    setDateRange,
  } = useSkuSelectionComparisonParams();

  const isFiltersReady =
    skuIds.length > 0 && Boolean(dateFrom) && Boolean(dateTo);

  return (
    <div className="grid gap-4">
      <SkuSelectionComparisonControls
        skuPicks={skuPicks}
        onSkuPicksChange={setSkuPicks}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={setDateRange}
      />

      {!isFiltersReady ? (
        <p className="text-muted-foreground text-sm">
          Оберіть товари (до 100) і період для кругових діаграм часток.
        </p>
      ) : null}

      {isFiltersReady ? (
        <SkuSelectionComparisonFetcher
          skuIds={skuIds}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      ) : null}
    </div>
  );
}
