import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { ProdEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";

interface SkuComparisonControlsProps {
  prod: string;
  dateFrom: string;
  dateTo: string;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuComparisonControls({
  prod,
  dateFrom,
  dateTo,
  onProdChange,
  onDateRangeChange,
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
      </div>
    </SurfaceSection>
  );
}
