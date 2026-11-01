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
import {
  SkuMultiSelectControl,
  type SkuMultiSelectPick,
} from "@/modules/skus/components/controls/sku-multi-select-control";
import { typography } from "@/lib/typography";
import type { DateRange } from "react-day-picker";

interface SkuSelectionStockExcelDialogViewProps {
  picks: readonly SkuMultiSelectPick[];
  onPicksChange: (picks: SkuMultiSelectPick[]) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuStockExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuStockExcelMetric[]) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSelectionStockExcelDialogView({
  picks,
  onPicksChange,
  dateRange,
  onDateRangeChange,
  selectedMetrics,
  onSelectedMetricsChange,
  isDownloading,
  onDownload,
  onCancel,
}: SkuSelectionStockExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const hasMetrics = selectedMetrics.length > 0;
  const hasSkus = picks.length > 0;

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Excel залишків за обраними SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Оберіть до 100 товарів (можна з різних конкурентів), метрики і період.
          Файл готується через excel-jobs.
        </p>

        <SkuMultiSelectControl
          value={picks}
          onChange={onPicksChange}
          disabled={isDownloading}
          searchInputId="sku-selection-stock-search"
        />

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
            disabled={(date) => date > new Date() || isDownloading}
            numberOfMonths={1}
          />
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Готуємо..."
          isDisabled={!isRangeValid || !hasMetrics || !hasSkus}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
