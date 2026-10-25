import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  SkuStockExcelMetricsControl,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs";
import type { DateRange } from "react-day-picker";
import { typography } from "@/lib/typography";

interface SkugrSliceExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuStockExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuStockExcelMetric[]) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkugrSliceExcelDialogView({
  dateRange,
  onDateRangeChange,
  selectedMetrics,
  onSelectedMetricsChange,
  isDownloading,
  onDownload,
  onCancel,
}: SkugrSliceExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;
  const hasMetrics = selectedMetrics.length > 0;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Експорт Excel залишків товарної групи</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className={typography.pageDescription}>
          Файл з усіма SKU групи за обраний період. Рядки метрик та підсумки —
          згідно з вибраними метриками.
        </p>
        <SkuStockExcelMetricsControl
          value={selectedMetrics}
          onChange={onSelectedMetricsChange}
          disabled={isDownloading}
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
          isSubmitting={isDownloading}
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
