import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

interface SkuSalesExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  isExporting: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSalesExcelDialogView({
  dateRange,
  onDateRangeChange,
  isExporting,
  onDownload,
  onCancel,
}: SkuSalesExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel продаж та виручки</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Файл формується на основі даних API за обраний період: дата, продажі
          (шт), виручка, ціна, ознака дня постачання.
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
          isSubmitting={isExporting}
          submitText="Скачати"
          submitLoadingText="Формування..."
          isDisabled={!isRangeValid}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
