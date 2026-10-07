import { DialogActions } from "@/components/shared/dialogs";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { typography } from "@/lib/typography";
import { differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";

export const POST_CORRECTIONS_MAX_RANGE_DAYS = 31;

interface RunPostCorrectionsDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  apply: boolean;
  onApplyChange: (apply: boolean) => void;
  isRunning: boolean;
  onRun: () => void;
  onCancel: () => void;
}

export function RunPostCorrectionsDialogView({
  dateRange,
  onDateRangeChange,
  apply,
  onApplyChange,
  isRunning,
  onRun,
  onCancel,
}: RunPostCorrectionsDialogViewProps) {
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
    daySpan <= POST_CORRECTIONS_MAX_RANGE_DAYS;
  const isOverMax =
    from !== undefined &&
    to !== undefined &&
    daySpan > POST_CORRECTIONS_MAX_RANGE_DAYS;

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Коригування залишків</DialogTitle>
        <DialogDescription>
          Post-pass після зрізів: fake stock balun/svbum, pack-flip auto-apply,
          manufacturer rollup. Без галочки — лише звіт (dry-run).
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Після запуску вікно закриється одразу — коригування йде у фоні.
          Результат прийде сповіщенням. Діапазон включно, максимум{" "}
          {POST_CORRECTIONS_MAX_RANGE_DAYS} днів.
        </p>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > new Date() || isRunning}
            numberOfMonths={1}
          />
        </div>

        {isOverMax ? (
          <p className="text-destructive text-sm">
            Максимум {POST_CORRECTIONS_MAX_RANGE_DAYS} календарних днів.
          </p>
        ) : null}

        <div className="flex gap-3">
          <Checkbox
            id="post-corrections-apply"
            checked={apply}
            onCheckedChange={(v) => onApplyChange(v === true)}
            disabled={isRunning}
          />
          <div className="grid gap-1">
            <Label htmlFor="post-corrections-apply" className="font-medium">
              Застосувати зміни
            </Label>
            <p className={typography.pageDescription}>
              Без галочки — dry-run (зрізів не змінює). З галочкою — запис у
              SkuSlice і rollup.
            </p>
          </div>
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onRun}
          isSubmitting={isRunning}
          isDisabled={!isRangeValid}
          submitText={apply ? "Запустити" : "Dry-run"}
          submitLoadingText="Запуск..."
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
