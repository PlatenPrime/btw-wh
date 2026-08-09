import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import {
  KonkEntitySelect,
  ProdEntitySelect,
} from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

export interface SkuStatisticsProdControlsViewProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  konks: KonkDto[];
  prods: ProdDto[];
  onKonkChange: (value: string) => void;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuStatisticsProdControlsView({
  konk,
  prod,
  dateFrom,
  dateTo,
  konks,
  prods,
  onKonkChange,
  onProdChange,
  onDateRangeChange,
}: SkuStatisticsProdControlsViewProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <KonkEntitySelect
          value={konk}
          onValueChange={onKonkChange}
          konks={konks}
          className="min-w-[180px] sm:min-w-[220px]"
        />

        <ProdEntitySelect
          value={prod}
          onValueChange={onProdChange}
          prods={prods}
          className="min-w-[160px] sm:min-w-[200px]"
        />

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-statistics-prod"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </SurfaceSection>
  );
}
