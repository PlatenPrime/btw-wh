import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { KonkEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import type { KonkDto } from "@/modules/konks/api/types";

export interface SkuPackFlipsControlsViewProps {
  konk: string;
  dateFrom: string;
  dateTo: string;
  konks: KonkDto[];
  isSubmitReady: boolean;
  isFetching: boolean;
  onKonkChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onSubmit: () => void;
}

export function SkuPackFlipsControlsView({
  konk,
  dateFrom,
  dateTo,
  konks,
  isSubmitReady,
  isFetching,
  onKonkChange,
  onDateRangeChange,
  onSubmit,
}: SkuPackFlipsControlsViewProps) {
  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <KonkEntitySelect
          value={konk}
          onValueChange={onKonkChange}
          konks={konks}
          className="min-w-[180px] sm:min-w-[220px]"
        />

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-pack-flips-controls"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />

        <Button
          type="button"
          disabled={!isSubmitReady || isFetching}
          onClick={onSubmit}
        >
          {isFetching ? "Перевірка…" : "Запустити перевірку"}
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">
        Діагностика масштабу pack vs piece: кратна інверсія залишку й ціни. Це не
        продажі і не компенсуючий зріз — зрізи SkuSlice не змінюються.
        Колонка «після» — пропонований рескейл, не записаний.
      </p>
    </SurfaceSection>
  );
}
