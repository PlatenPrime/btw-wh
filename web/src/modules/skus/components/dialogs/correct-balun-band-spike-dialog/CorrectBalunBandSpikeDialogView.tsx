import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  CorrectBalunBandSpikeResultDto,
  CorrectBalunBandSpikeSkipReason,
} from "@/modules/skus/api/types";
import { differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";

export const BALUN_BAND_SPIKE_MAX_RANGE_DAYS = 366;

const SKIP_REASON_LABELS: Record<CorrectBalunBandSpikeSkipReason, string> = {
  "missing-left": "Немає сусіда зліва",
  "missing-right": "Немає сусіда справа",
  "not-sandwich-left": "Лівий сусід не «невеликий»",
  "not-sandwich-right": "Правий сусід не «невеликий»",
};

interface CorrectBalunBandSpikeDialogViewProps {
  skuTitle: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  preview: CorrectBalunBandSpikeResultDto | null;
  isPreviewing: boolean;
  isApplying: boolean;
  onPreview: () => void;
  onApply: () => void;
  onCancel: () => void;
}

function toDateLabel(value: string): string {
  return value.slice(0, 10);
}

export function CorrectBalunBandSpikeDialogView({
  skuTitle,
  dateRange,
  onDateRangeChange,
  preview,
  isPreviewing,
  isApplying,
  onPreview,
  onApply,
  onCancel,
}: CorrectBalunBandSpikeDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const daySpan =
    from !== undefined && to !== undefined
      ? differenceInCalendarDays(to, from) + 1
      : 0;
  const isRangeValid =
    from !== undefined &&
    to !== undefined &&
    from <= to &&
    daySpan <= BALUN_BAND_SPIKE_MAX_RANGE_DAYS;
  const isOverMax =
    from !== undefined &&
    to !== undefined &&
    daySpan > BALUN_BAND_SPIKE_MAX_RANGE_DAYS;
  const isBusy = isPreviewing || isApplying;
  const canApply = Boolean(preview && preview.patches.length > 0 && !preview.applied);

  return (
    <DialogContent className="sm:max-w-[560px]">
      <DialogHeader>
        <DialogTitle>Виправити band-spike</DialogTitle>
        <DialogDescription>
          RTL sandwich для balun: невелике → [9000, 10000] → невелике. Спочатку
          preview, потім запис. Товар: {skuTitle}.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Оберіть період спалаху. Сервер підвантажить сусідів ±1 день; продажі
          всередині смуги зберігаються. Діапазон ≤{" "}
          {BALUN_BAND_SPIKE_MAX_RANGE_DAYS} днів.
        </p>

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
            Максимум {BALUN_BAND_SPIKE_MAX_RANGE_DAYS} календарних днів.
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
          disabled={!isRangeValid || isBusy}
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
