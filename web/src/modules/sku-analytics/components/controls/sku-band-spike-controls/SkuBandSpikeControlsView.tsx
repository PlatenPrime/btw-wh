import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { KonkEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { KonkDto } from "@/modules/konks/api/types";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

export const BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS = 93;

export interface SkuBandSpikeControlsViewProps {
  konk: string;
  dateFrom: string;
  dateTo: string;
  stockMinRaw: string;
  stockMaxRaw: string;
  konks: KonkDto[];
  isSubmitReady: boolean;
  isFetching: boolean;
  onKonkChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onStockBandChange: (min: string, max: string) => void;
  onSubmit: () => void;
}

function getDaySpan(dateFrom: string, dateTo: string): number | null {
  if (!dateFrom || !dateTo) return null;
  const from = parseISO(dateFrom);
  const to = parseISO(dateTo);
  if (!isValid(from) || !isValid(to) || from > to) return null;
  return differenceInCalendarDays(to, from) + 1;
}

export function SkuBandSpikeControlsView({
  konk,
  dateFrom,
  dateTo,
  stockMinRaw,
  stockMaxRaw,
  konks,
  isSubmitReady,
  isFetching,
  onKonkChange,
  onDateRangeChange,
  onStockBandChange,
  onSubmit,
}: SkuBandSpikeControlsViewProps) {
  const daySpan = getDaySpan(dateFrom, dateTo);
  const isOverMax =
    daySpan !== null && daySpan > BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS;

  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex min-w-0 flex-wrap items-end gap-3">
        <KonkEntitySelect
          value={konk}
          onValueChange={onKonkChange}
          konks={konks}
          className="min-w-[180px] sm:min-w-[220px]"
        />

        <div className="grid gap-2">
          <Input
            id="band-spike-discover-stock-min"
            type="number"
            min={0}
            inputMode="decimal"
            className="w-[140px]"
            value={stockMinRaw}
            onChange={(event) =>
              onStockBandChange(event.target.value, stockMaxRaw)
            }
            placeholder="мін."
          />
        </div>

        <div className="grid gap-2">
          <Input
            id="band-spike-discover-stock-max"
            type="number"
            min={0}
            inputMode="decimal"
            className="w-[140px]"
            value={stockMaxRaw}
            onChange={(event) =>
              onStockBandChange(stockMinRaw, event.target.value)
            }
            placeholder="макс."
          />
        </div>

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-band-spike-controls"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />

        <Button
          type="button"
          disabled={!isSubmitReady || isFetching || isOverMax}
          onClick={onSubmit}
        >
          {isFetching ? "Шукаю…" : "Знайти"}
        </Button>
      </div>

      {isOverMax ? (
        <p className="text-destructive text-sm">
          Максимум {BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS} календарних днів для
          discovery.
        </p>
      ) : null}
    </SurfaceSection>
  );
}
