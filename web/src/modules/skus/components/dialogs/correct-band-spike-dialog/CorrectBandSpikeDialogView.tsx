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

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

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

function toUaDate(value: string): string {
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value.slice(0, 10);
  return `${day}.${month}.${year}`;
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
        <DialogTitle>Виправити збільшення залишку</DialogTitle>
        <DialogDescription>Товар: {skuTitle}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Спочатку перегляньте зміни, потім застосуйте. Продажі всередині смуги
          зберігаються. Період — до {BAND_SPIKE_MAX_RANGE_DAYS} днів.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="band-spike-stock-min">Мін. залишок</Label>
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
            <Label htmlFor="band-spike-stock-max">Макс. залишок</Label>
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
              Мін. і макс. мають бути ≥ 0, і мін. ≤ макс.
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
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span>
                Вікно: {toUaDate(preview.window.dateFrom)} —{" "}
                {toUaDate(preview.window.dateTo)}
              </span>
              <span>
                Смуга: {numberFormat.format(preview.band.min)}–
                {numberFormat.format(preview.band.max)}
              </span>
              {preview.konkName ? (
                <span>Конкурент: {preview.konkName}</span>
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
                        <TableCell className="tabular-nums">
                          {toUaDate(patch.date)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {numberFormat.format(patch.from)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {numberFormat.format(patch.to)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Змін немає — у періоді немає коректного сплеску або всі
                вікна пропущені.
              </p>
            )}

            {preview.skipped.length > 0 ? (
              <div className="grid gap-1">
                <p className="text-sm font-medium">Пропущено</p>
                <ul className="text-muted-foreground grid gap-1 text-sm">
                  {preview.skipped.map((item) => (
                    <li
                      key={`${item.dateFrom}-${item.dateTo}-${item.reason}`}
                    >
                      {toUaDate(item.dateFrom)} — {toUaDate(item.dateTo)}:{" "}
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
          variant="info"
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
