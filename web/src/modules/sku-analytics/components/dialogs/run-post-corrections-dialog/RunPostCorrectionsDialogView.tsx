import { DialogActions } from "@/components/shared/dialogs";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";
import { differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";

export const POST_CORRECTIONS_MAX_RANGE_DAYS = 31;
export const POST_CORRECTIONS_ALL_KONKS = "all";

interface RunPostCorrectionsDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  konkName: string;
  onKonkNameChange: (value: string) => void;
  konks: KonkDto[];
  isKonksLoading: boolean;
  apply: boolean;
  onApplyChange: (apply: boolean) => void;
  isRunning: boolean;
  onRun: () => void;
  onCancel: () => void;
}

export function RunPostCorrectionsDialogView({
  dateRange,
  onDateRangeChange,
  konkName,
  onKonkNameChange,
  konks,
  isKonksLoading,
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

  const isScoped = Boolean(konkName) && konkName !== POST_CORRECTIONS_ALL_KONKS;

  const description = isScoped
    ? `Для ${konkName}: виправлення кратності упаковки (якщо увімкнено для цього конкурента) і зведення залишків по виробнику. Сплески залишків сюди не входять — лише вручну на сторінці «Корегування».`
    : "Для всіх конкурентів: виправлення кратності упаковки (де увімкнено) і зведення залишків по виробнику. Сплески залишків — лише вручну на сторінці «Корегування» або в картці товару.";

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Коригування залишків</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Після запуску вікно закриється одразу — робота йде у фоні. Результат
          прийде сповіщенням. Період — до {POST_CORRECTIONS_MAX_RANGE_DAYS} днів.
        </p>

        <div className="flex flex-col gap-2">
          <Label htmlFor="post-corrections-konk">Конкурент</Label>
          <Select
            value={konkName || POST_CORRECTIONS_ALL_KONKS}
            onValueChange={onKonkNameChange}
            disabled={isRunning || isKonksLoading}
          >
            <SelectTrigger
              id="post-corrections-konk"
              aria-label="Конкурент"
              className="w-full"
            >
              <SelectValue placeholder="Усі конкуренти" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={POST_CORRECTIONS_ALL_KONKS}>
                Усі конкуренти
              </SelectItem>
              {konks.map((k) => (
                <SelectItem key={k._id} value={k.name}>
                  <EntityLabel
                    imageUrl={k.imageUrl}
                    title={k.title}
                    fallbackLabel={k.name}
                    imageSize="xs"
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              Без галочки — лише перегляд, зрізи не змінюються. З галочкою —
              записати зміни.
            </p>
          </div>
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onRun}
          isSubmitting={isRunning}
          isDisabled={!isRangeValid}
          submitText={apply ? "Запустити" : "Переглянути"}
          submitLoadingText="Запуск..."
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
