import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { ProdEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SkuComparisonKonksFilter } from "@/modules/sku-analytics/components/controls/sku-comparison-konks-filter";

interface SkuComparisonControlsProps {
  prod: string;
  dateFrom: string;
  dateTo: string;
  excludeKonks: string[];
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onExcludeKonksChange: (names: string[]) => void;
}

export function SkuComparisonControls({
  prod,
  dateFrom,
  dateTo,
  excludeKonks,
  onProdChange,
  onDateRangeChange,
  onExcludeKonksChange,
}: SkuComparisonControlsProps) {
  const prodsQuery = useProdsQuery();
  const prods = prodsQuery.data?.data ?? [];

  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <ProdEntitySelect
          value={prod}
          onValueChange={onProdChange}
          prods={prods}
          className="min-w-[180px] sm:min-w-[220px]"
        />

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-comparison-controls"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />

        <SkuComparisonKonksFilter
          excludeKonks={excludeKonks}
          onExcludeKonksChange={onExcludeKonksChange}
        />
      </div>
    </SurfaceSection>
  );
}
