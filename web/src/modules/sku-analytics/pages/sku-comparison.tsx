import { SkuComparisonControls } from "@/modules/sku-analytics/components/controls/sku-comparison-controls";
import { SkuComparisonFetcher } from "@/modules/sku-analytics/components/fetchers/sku-comparison-fetcher";
import { useSkuComparisonParams } from "@/modules/sku-analytics/hooks/useSkuComparisonParams";

/** Порівняння по конкурентах (підроут /sku/comparison/konks). */
export function SkuComparison() {
  const {
    prod,
    dateFrom,
    dateTo,
    excludeKonks,
    setProd,
    setDateRange,
    setExcludeKonks,
  } = useSkuComparisonParams();

  const isFiltersReady = Boolean(prod && dateFrom && dateTo);

  return (
    <div className="grid gap-4">
      <SkuComparisonControls
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
        excludeKonks={excludeKonks}
        onProdChange={setProd}
        onDateRangeChange={setDateRange}
        onExcludeKonksChange={setExcludeKonks}
      />

      {!isFiltersReady ? (
        <p className="text-muted-foreground text-sm">
          Оберіть виробника та період для порівняння продажів по конкурентах.
        </p>
      ) : null}

      {isFiltersReady ? (
        <SkuComparisonFetcher
          prod={prod}
          dateFrom={dateFrom}
          dateTo={dateTo}
          excludeKonks={excludeKonks}
        />
      ) : null}
    </div>
  );
}
