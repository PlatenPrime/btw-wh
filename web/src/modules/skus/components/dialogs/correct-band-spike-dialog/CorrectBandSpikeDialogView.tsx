import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { typography } from "@/lib/typography";
import type {
  CorrectBandSpikeResultDto,
  CorrectBandSpikeSkipReason,
} from "@/modules/skus/api/types";
import { differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";

export const BAND_SPIKE_MAX_RANGE_DAYS = 366;

const SKIP_REASON_LABELS: Record<CorrectBandSpikeSkipReason, string> = {
  "missing-left": "Немає сусіда зліва",
  "missing-right": "Немає сусіда справа",
  "not-sandwich-left": "Лівий сусід не «невеликий»",
  "not-sandwich-right": "Правий сусід не «невеликий»",
};

interface CorrectBandSpikeDialogViewProps {
  skuTitle: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  stockMin: string;
  stockMax: string;
  onStockMinChange: (value: string) => void;
  onStockMaxChange: (value: string) => void;
  preview: CorrectBandSpikeResultDto | null;
  isPreviewing: boolean;
  isApplying: boolean;
  onPreview: () => void;
  onApply: () => void;
  onCancel: () => void;
}

function toDateLabel(value: string): string {
  return value.slice(0, 10);
}

function parseNonNegativeNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

export function CorrectBandSpikeDialogView({
  skuTitle,
  dateRange,
  onDateRangeChange,
  stockMin,
  stockMax,
  onStockMinChange,
  onStockMaxChange,
  preview,
  isPreviewing,
  isApplying,
  onPreview,
  onApply,
  onCancel,
}: CorrectBandSpikeDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const daySpan =
    from !== undefined && to !== undefined
      ? differenceInCalendarDays(to, from) + 1
      : 0;
  const parsedMin = parseNonNegativeNumber(stockMin);
  const parsedMax = parseNonNegativeNumber(stockMax);
  const isBandValid =
    parsedMin !== null && parsedMax !== null && parsedMin <= parsedMax;
  const isRangeValid =
    from !== undefined &&
    to !== undefined &&
    from <= to &&
    daySpan <= BAND_SPIKE_MAX_RANGE_DAYS;
  const isOverMax =
    from !== undefined &&
    to !== undefined &&
    daySpan > BAND_SPIKE_MAX_RANGE_DAYS;
  const isBusy = isPreviewing || isApplying;
  const canSubmit = isRangeValid && isBandValid && !isBusy;
  const canApply = Boolean(
    preview && preview.patches.length > 0 && !preview.applied,
  );

  return (
    <DialogContent className="sm:max-w-[560px]">
      <DialogHeader>
        <DialogTitle>Виправити band-spike</DialogTitle>
        <DialogDescription>
          RTL sandwich: невелике (&lt; stockMin) → [stockMin, stockMax] →
          невелике. Спочатку preview, потім запис. Товар: {skuTitle}.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Оберіть період і смугу залишку. Сервер підвантажить сусідів ±1 день;
          продажі всередині смуги зберігаються. Діапазон ≤{" "}
          {BAND_SPIKE_MAX_RANGE_DAYS} днів. Підказки: svbum часто мільйони;
          balun ~5k / 9–11k — числа завжди вводить адмін.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="band-spike-stock-min">stockMin</Label>
            <Input
              id="band-spike-stock-min"
              type="number"
              min={0}
              inputMode="decimal"
              value={stockMin}
              onChange={(event) => onStockMinChange(event.target.value)}
              disabled={isBusy}
              placeholder="напр. 9000"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="band-spike-stock-max">stockMax</Label>
            <Input
              id="band-spike-stock-max"
              type="number"
              min={0}
              inputMode="decimal"
              value={stockMax}
              onChange={(event) => onStockMaxChange(event.target.value)}
              disabled={isBusy}
              placeholder="напр. 11000"
            />
          </div>
        </div>

        {stockMin.trim() || stockMax.trim() ? (
          !isBandValid ? (
            <p className="text-destructive text-sm">
              stockMin і stockMax мають бути ≥ 0, finite, і min ≤ max.
            </p>
          ) : null
        ) : null}

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > new Date() || isBusy}
            numberOfMonths={1}
          />
        </div>

        {isOverMax ? (
          <p className="text-destructive text-sm">
            Максимум {BAND_SPIKE_MAX_RANGE_DAYS} календарних днів.
          </p>
        ) : null}

        {preview ? (
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>
                Вікно: {toDateLabel(preview.window.dateFrom)}–
                {toDateLabel(preview.window.dateTo)}
              </span>
              <span>
                Band: {preview.band.min}–{preview.band.max}
              </span>
              {preview.konkName ? (
                <span>Konk: {preview.konkName}</span>
              ) : null}
              {preview.applied ? (
                <span className="text-foreground font-medium">Застосовано</span>
              ) : null}
            </div>

            {preview.patches.length > 0 ? (
              <div className="max-h-48 overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead className="text-right">Було</TableHead>
                      <TableHead className="text-right">Стане</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.patches.map((patch) => (
                      <TableRow key={patch.date}>
                        <TableCell>{toDateLabel(patch.date)}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {patch.from}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {patch.to}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Патчів немає — sandwich у періоді не знайдено або всі вікна
                пропущені.
              </p>
            )}

            {preview.skipped.length > 0 ? (
              <div className="grid gap-1">
                <p className="text-sm font-medium">Пропущено</p>
                <ul className="grid gap-1 text-sm text-muted-foreground">
                  {preview.skipped.map((item) => (
                    <li
                      key={`${item.dateFrom}-${item.dateTo}-${item.reason}`}
                    >
                      {toDateLabel(item.dateFrom)}–{toDateLabel(item.dateTo)}:{" "}
                      {SKIP_REASON_LABELS[item.reason] ?? item.reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <DialogFooter className="flex flex-wrap gap-2 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isBusy}
        >
          Скасувати
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onPreview}
          disabled={!canSubmit}
        >
          {isPreviewing ? "Перегляд..." : "Переглянути"}
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={onApply}
          disabled={!canApply || isBusy}
        >
          {isApplying ? "Застосування..." : "Застосувати"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
