import { DialogActions } from "@/components/shared/dialogs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { format, parse } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import type { DateRange } from "react-day-picker";
import type { UseFormReturn } from "react-hook-form";
import { PatchSkuSliceFormSkeleton } from "./PatchSkuSliceFormSkeleton";
import type {
  PatchSkuSliceFormData,
  PatchSkuSliceFormMode,
} from "./schema";

const DATE_API_FORMAT = "yyyy-MM-dd";

interface PatchSkuSliceFormViewProps {
  form: UseFormReturn<PatchSkuSliceFormData>;
  skuTitle: string;
  mode: PatchSkuSliceFormMode;
  dateRange: DateRange | undefined;
  periodRanges: Array<DateRange | undefined>;
  isPreviewLoading: boolean;
  showMissingPointHint: boolean;
  previewErrorMessage: string | null;
  currentStock: number | null;
  currentPrice: number | null;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
  onModeChange: (mode: PatchSkuSliceFormMode) => void;
  onDateChange: (date: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onPeriodRangeChange: (index: number, range: DateRange | undefined) => void;
  onAddPeriod: () => void;
  onRemovePeriod: (index: number) => void;
  onSubmit: (data: PatchSkuSliceFormData) => void;
  onCancel?: () => void;
}

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  try {
    return parse(value, DATE_API_FORMAT, new Date());
  } catch {
    return undefined;
  }
}

function formatRangeLabel(range: DateRange | undefined): string {
  if (!range?.from) return "Оберіть період";
  if (!range.to) {
    return format(range.from, "d MMM yyyy", { locale: uk });
  }
  return `${format(range.from, "d MMM yyyy", { locale: uk })} – ${format(range.to, "d MMM yyyy", { locale: uk })}`;
}

export function PatchSkuSliceFormView({
  form,
  skuTitle,
  mode,
  dateRange,
  periodRanges,
  isPreviewLoading,
  showMissingPointHint,
  previewErrorMessage,
  currentStock,
  currentPrice,
  isSubmitting,
  isSubmitDisabled,
  onModeChange,
  onDateChange,
  onDateRangeChange,
  onPeriodRangeChange,
  onAddPeriod,
  onRemovePeriod,
  onSubmit,
  onCancel,
}: PatchSkuSliceFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const date = watch("date");
  const selectedDate = parseDate(date);
  const isDateMode = mode === "date";
  const isPeriodMode = mode === "period";
  const isPeriodsMode = mode === "periods";
  const hasCurrentPoint = currentStock !== null && currentPrice !== null;
  const showStockPriceFields =
    !isDateMode || (!isPreviewLoading && !previewErrorMessage);
  const periodsError =
    typeof errors.periods?.message === "string"
      ? errors.periods.message
      : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <p className={typography.pageDescription}>
        Сирий запис у SkuSlice, не live-scrape і не compensating. Нічний
        pack-flip орієнтується на ці значення. Для періоду або кількох періодів —
        однакові stock/price на всі дні одним запитом.
      </p>
      {skuTitle ? (
        <p className={typography.caption}>{skuTitle}</p>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label id="patch-sku-slice-mode-label">Режим</Label>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="patch-sku-slice-mode-label"
        >
          <Button
            type="button"
            variant={isDateMode ? "default" : "outline"}
            size="sm"
            disabled={isSubmitting}
            onClick={() => onModeChange("date")}
          >
            Дата
          </Button>
          <Button
            type="button"
            variant={isPeriodMode ? "default" : "outline"}
            size="sm"
            disabled={isSubmitting}
            onClick={() => onModeChange("period")}
          >
            Період
          </Button>
          <Button
            type="button"
            variant={isPeriodsMode ? "default" : "outline"}
            size="sm"
            disabled={isSubmitting}
            onClick={() => onModeChange("periods")}
          >
            Періоди
          </Button>
        </div>
      </div>

      {isDateMode ? (
        <div className="flex flex-col gap-2">
          <Label id="patch-sku-slice-date-label">Дата</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="patch-sku-slice-date"
                type="button"
                variant="outline"
                aria-labelledby="patch-sku-slice-date-label"
                aria-label="Дата зрізу"
                disabled={isSubmitting}
                className={cn(
                  "flex justify-start gap-2 text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="size-4 shrink-0" />
                {selectedDate ? (
                  format(selectedDate, "d MMM yyyy", { locale: uk })
                ) : (
                  <span>Оберіть дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) =>
                  onDateChange(d ? format(d, DATE_API_FORMAT) : "")
                }
                disabled={(d) => d > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date ? (
            <p className={typography.formError}>{errors.date.message}</p>
          ) : null}
        </div>
      ) : null}

      {isPeriodMode ? (
        <div className="flex flex-col gap-2">
          <Label id="patch-sku-slice-range-label">Період</Label>
          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              disabled={(d) => d > new Date() || isSubmitting}
              numberOfMonths={1}
              initialFocus
            />
          </div>
          {errors.dateFrom ? (
            <p className={typography.formError}>{errors.dateFrom.message}</p>
          ) : null}
          {errors.dateTo ? (
            <p className={typography.formError}>{errors.dateTo.message}</p>
          ) : null}
        </div>
      ) : null}

      {isPeriodsMode ? (
        <div className="flex flex-col gap-3">
          <Label id="patch-sku-slice-periods-label">Періоди</Label>
          <div
            className="flex flex-col gap-3"
            role="group"
            aria-labelledby="patch-sku-slice-periods-label"
          >
            {periodRanges.map((range, index) => {
              const periodErrors = errors.periods?.[index];
              return (
                <div
                  key={`period-${index}`}
                  className="flex flex-col gap-2 rounded-md border p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className={typography.caption}>Період {index + 1}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isSubmitting}
                      onClick={() => onRemovePeriod(index)}
                      aria-label={`Видалити період ${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSubmitting}
                        className={cn(
                          "flex justify-start gap-2 text-left font-normal",
                          !range?.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="size-4 shrink-0" />
                        {formatRangeLabel(range)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={range}
                        onSelect={(nextRange) =>
                          onPeriodRangeChange(index, nextRange)
                        }
                        disabled={(d) => d > new Date() || isSubmitting}
                        numberOfMonths={1}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {periodErrors?.dateFrom ? (
                    <p className={typography.formError}>
                      {periodErrors.dateFrom.message}
                    </p>
                  ) : null}
                  {periodErrors?.dateTo ? (
                    <p className={typography.formError}>
                      {periodErrors.dateTo.message}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={onAddPeriod}
            className="self-start"
          >
            <Plus className="size-4" />
            Додати період
          </Button>
          {periodsError ? (
            <p className={typography.formError}>{periodsError}</p>
          ) : null}
        </div>
      ) : null}

      {isPreviewLoading ? <PatchSkuSliceFormSkeleton /> : null}

      {!isPreviewLoading && showMissingPointHint ? (
        <p className={typography.formHint}>
          Точки на цю дату ще немає — документ дня створиться при збереженні
          (upsert).
        </p>
      ) : null}

      {!isPreviewLoading && previewErrorMessage ? (
        <p className={typography.formError}>{previewErrorMessage}</p>
      ) : null}

      {showStockPriceFields ? (
        <div className="flex flex-col gap-3">
          {isDateMode && hasCurrentPoint ? (
            <p className={typography.formHint}>
              Поточні: {currentStock} / {currentPrice}
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="patch-sku-slice-stock">Залишок</Label>
              <Input
                id="patch-sku-slice-stock"
                type="number"
                step="any"
                {...register("stock", { valueAsNumber: true })}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.stock)}
              />
              {errors.stock ? (
                <p className={typography.formError}>{errors.stock.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="patch-sku-slice-price">Ціна</Label>
              <Input
                id="patch-sku-slice-price"
                type="number"
                step="any"
                {...register("price", { valueAsNumber: true })}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.price)}
              />
              {errors.price ? (
                <p className={typography.formError}>{errors.price.message}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        isDisabled={isSubmitDisabled}
        submitText="Зберегти"
        submitLoadingText="Збереження..."
        variant="edit"
        className="w-full"
      />
    </form>
  );
}
