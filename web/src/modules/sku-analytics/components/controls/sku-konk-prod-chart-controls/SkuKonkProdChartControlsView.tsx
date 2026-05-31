import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import {
  KonkEntitySelect,
  ProdEntitySelect,
} from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { SkuKonkProdChartSkugrFilterView } from "@/modules/sku-analytics/components/controls/sku-konk-prod-chart-controls/SkuKonkProdChartSkugrFilterView";

export interface SkuKonkProdChartControlsViewProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds: string[];
  konks: KonkDto[];
  prods: ProdDto[];
  onKonkChange: (value: string) => void;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onSkugrIdsChange: (ids: string[]) => void;
  isSkugrDialogOpen: boolean;
  onSkugrDialogOpenChange: (open: boolean) => void;
  prodNameForSkugrList: string;
  skugrDialogReady: boolean;
}

export function SkuKonkProdChartControlsView({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  konks,
  prods,
  onKonkChange,
  onProdChange,
  onDateRangeChange,
  onSkugrIdsChange,
  isSkugrDialogOpen,
  onSkugrDialogOpenChange,
  prodNameForSkugrList,
  skugrDialogReady,
}: SkuKonkProdChartControlsViewProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <KonkEntitySelect
          value={konk}
          onValueChange={onKonkChange}
          konks={konks}
        />

        <ProdEntitySelect
          value={prod}
          onValueChange={onProdChange}
          prods={prods}
          showAllProducersOption
        />

        <SkuKonkProdChartSkugrFilterView
          skugrIds={skugrIds}
          onSkugrIdsChange={onSkugrIdsChange}
          isDialogOpen={isSkugrDialogOpen}
          onDialogOpenChange={onSkugrDialogOpenChange}
          konkName={konk}
          prodNameForList={prodNameForSkugrList}
          disabled={!skugrDialogReady}
        />

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-konk-prod-chart"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </SurfaceSection>
  );
}
