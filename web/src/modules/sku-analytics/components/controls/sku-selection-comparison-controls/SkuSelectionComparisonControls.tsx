import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { SurfaceSection } from "@/components/shared/layout";
import {
  SkuMultiSelectControl,
  type SkuMultiSelectPick,
  type SkuMultiSelectQuery,
} from "@/modules/skus/components/controls/sku-multi-select-control";

interface SkuSelectionComparisonControlsProps {
  skuPicks: readonly SkuMultiSelectPick[];
  onSkuPicksChange: (picks: SkuMultiSelectPick[]) => void;
  selectAll: boolean;
  onSelectAllChange: (selectAll: boolean) => void;
  selectionQuery: SkuMultiSelectQuery;
  onSelectionQueryChange: (query: SkuMultiSelectQuery) => void;
  onMatchedTotalChange: (total: number) => void;
  onReset: () => void;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuSelectionComparisonControls({
  skuPicks,
  onSkuPicksChange,
  selectAll,
  onSelectAllChange,
  selectionQuery,
  onSelectionQueryChange,
  onMatchedTotalChange,
  onReset,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuSelectionComparisonControlsProps) {
  return (
    <SurfaceSection className="grid gap-3">
      <SkuMultiSelectControl
        layout="page"
        value={skuPicks}
        onChange={onSkuPicksChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
        initialQuery={selectionQuery}
        onSelectionQueryChange={onSelectionQueryChange}
        onMatchedTotalChange={onMatchedTotalChange}
        onReset={onReset}
        enabled={Boolean(dateFrom && dateTo)}
        disabledHint="Оберіть період, щоб показати товари."
        searchInputId="sku-selection-comparison-search"
        leadingSlot={
          <ChartDateRangeToolbar
            layout="inline"
            idPrefix="sku-selection-comparison-controls"
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateRangeChange={onDateRangeChange}
          />
        }
      />
    </SurfaceSection>
  );
}
