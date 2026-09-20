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
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { PatchSkuSliceFormSkeleton } from "./PatchSkuSliceFormSkeleton";
import type { PatchSkuSliceFormData } from "./schema";

const DATE_API_FORMAT = "yyyy-MM-dd";

interface PatchSkuSliceFormViewProps {
  form: UseFormReturn<PatchSkuSliceFormData>;
  skuTitle: string;
  isPreviewLoading: boolean;
  isNotFound: boolean;
  previewErrorMessage: string | null;
  currentStock: number | null;
  currentPrice: number | null;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
  onDateChange: (date: string) => void;
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

export function PatchSkuSliceFormView({
  form,
  skuTitle,
  isPreviewLoading,
  isNotFound,
  previewErrorMessage,
  currentStock,
  currentPrice,
  isSubmitting,
  isSubmitDisabled,
  onDateChange,
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
  const hasCurrentPoint = currentStock !== null && currentPrice !== null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <p className={typography.pageDescription}>
        Сирий запис у SkuSlice за день, не live-scrape і не compensating.
        Нічний pack-flip орієнтується на ці значення.
      </p>
      {skuTitle ? (
        <p className={typography.caption}>{skuTitle}</p>
      ) : null}

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
              onSelect={(d) => onDateChange(d ? format(d, DATE_API_FORMAT) : "")}
              disabled={(d) => d > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date ? (
          <p className={typography.formError}>{errors.date.message}</p>
        ) : null}
      </div>

      {isPreviewLoading ? <PatchSkuSliceFormSkeleton /> : null}

      {!isPreviewLoading && isNotFound ? (
        <p className={typography.formError}>
          Немає документа зрізу на цю дату. День з нуля не створюється.
        </p>
      ) : null}

      {!isPreviewLoading && previewErrorMessage ? (
        <p className={typography.formError}>{previewErrorMessage}</p>
      ) : null}

      {!isPreviewLoading && !isNotFound && !previewErrorMessage && hasCurrentPoint ? (
        <div className="flex flex-col gap-3">
          <p className={typography.formHint}>
            Поточні: {currentStock} / {currentPrice}
          </p>
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
