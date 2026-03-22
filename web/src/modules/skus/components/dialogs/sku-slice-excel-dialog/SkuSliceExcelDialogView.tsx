import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

interface SkuSliceExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSliceExcelDialogView({
  dateRange,
  onDateRangeChange,
  isDownloading,
  onDownload,
  onCancel,
}: SkuSliceExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel залишків та цін</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Оберіть період дат. У файлі — метадані товару та колонки по датах: рядки
          «Залишок» і «Ціна».
        </p>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          disabled={(date) => date > new Date()}
          numberOfMonths={1}
        />
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Завантаження..."
          isDisabled={!isRangeValid}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
