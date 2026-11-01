import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { SurfaceSection } from "@/components/shared/layout";
import {
  SkuMultiSelectControl,
  type SkuMultiSelectPick,
} from "@/modules/skus/components/controls/sku-multi-select-control";

interface SkuSelectionComparisonControlsProps {
  skuPicks: readonly SkuMultiSelectPick[];
  onSkuPicksChange: (picks: SkuMultiSelectPick[]) => void;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuSelectionComparisonControls({
  skuPicks,
  onSkuPicksChange,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuSelectionComparisonControlsProps) {
  return (
    <SurfaceSection className="grid gap-3">
      <ChartDateRangeToolbar
        layout="inline"
        idPrefix="sku-selection-comparison-controls"
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
      <SkuMultiSelectControl
        value={skuPicks}
        onChange={onSkuPicksChange}
        searchInputId="sku-selection-comparison-search"
      />
    </SurfaceSection>
  );
}
