import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { KonkEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { KonkDto } from "@/modules/konks/api/types";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { useState } from "react";

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

/** Mid-edit: только цифры, без нормализации (чтобы не прыгал caret). */
function filterStockInput(value: string): string {
  return value.replace(/\D/g, "");
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
  const [minDraft, setMinDraft] = useState<string | null>(null);
  const [maxDraft, setMaxDraft] = useState<string | null>(null);

  const displayMin = minDraft !== null ? minDraft : stockMinRaw;
  const displayMax = maxDraft !== null ? maxDraft : stockMaxRaw;

  const daySpan = getDaySpan(dateFrom, dateTo);
  const isOverMax =
    daySpan !== null && daySpan > BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS;

  const commitStockBand = (min: string, max: string) => {
    if (min === stockMinRaw && max === stockMaxRaw) return;
    onStockBandChange(min, max);
  };

  const handleSubmit = () => {
    // Перед поиском фиксируем draft в URL (на случай фокуса без blur)
    commitStockBand(displayMin, displayMax);
    setMinDraft(null);
    setMaxDraft(null);
    onSubmit();
  };

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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-[140px]"
            value={displayMin}
            onFocus={() => setMinDraft(stockMinRaw)}
            onChange={(event) => {
              const next = filterStockInput(event.target.value);
              setMinDraft(next);
              commitStockBand(next, displayMax);
            }}
            onBlur={() => {
              commitStockBand(displayMin, displayMax);
              setMinDraft(null);
            }}
            placeholder="мін."
          />
        </div>

        <div className="grid gap-2">
          <Input
            id="band-spike-discover-stock-max"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-[140px]"
            value={displayMax}
            onFocus={() => setMaxDraft(stockMaxRaw)}
            onChange={(event) => {
              const next = filterStockInput(event.target.value);
              setMaxDraft(next);
              commitStockBand(displayMin, next);
            }}
            onBlur={() => {
              commitStockBand(displayMin, displayMax);
              setMaxDraft(null);
            }}
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
          onClick={handleSubmit}
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
