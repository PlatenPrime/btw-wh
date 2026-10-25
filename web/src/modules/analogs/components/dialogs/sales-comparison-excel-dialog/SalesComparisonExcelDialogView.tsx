import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { typography } from "@/lib/typography";

interface SalesComparisonExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SalesComparisonExcelDialogView({
  dateRange,
  onDateRangeChange,
  isDownloading,
  onDownload,
  onCancel,
}: SalesComparisonExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel порівняння продаж та виручки</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className={typography.pageDescription}>
          Оберіть період. У файлі — продажі, ціни й виручка аналога та Btrade
          по днях, підсумки «Всього» і різниця продажів / виручки.
        </p>
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > new Date()}
            numberOfMonths={1}
          />
        </div>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Готуємо..."
          isDisabled={!isRangeValid}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
