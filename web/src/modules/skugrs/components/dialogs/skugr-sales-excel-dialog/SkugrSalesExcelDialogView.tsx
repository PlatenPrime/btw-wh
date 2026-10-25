import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  SkuSalesExcelMetricsControl,
  type SkuSalesExcelMetric,
} from "@/modules/excel-jobs";
import type { DateRange } from "react-day-picker";
import { typography } from "@/lib/typography";

interface SkugrSalesExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuSalesExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuSalesExcelMetric[]) => void;
  isExporting: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkugrSalesExcelDialogView({
  dateRange,
  onDateRangeChange,
  selectedMetrics,
  onSelectedMetricsChange,
  isExporting,
  onDownload,
  onCancel,
}: SkugrSalesExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;
  const hasMetrics = selectedMetrics.length > 0;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel продаж товарної групи</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className={typography.pageDescription}>
          Файл з усіма SKU групи за обраний період. Рядки метрик та підсумки —
          згідно з вибраними метриками.
        </p>
        <SkuSalesExcelMetricsControl
          value={selectedMetrics}
          onChange={onSelectedMetricsChange}
          disabled={isExporting}
        />
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
          isSubmitting={isExporting}
          submitText="Скачати"
          submitLoadingText="Готуємо..."
          isDisabled={!isRangeValid || !hasMetrics}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
