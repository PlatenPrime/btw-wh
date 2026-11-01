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
import {
  SkuMultiSelectControl,
  type SkuMultiSelectPick,
} from "@/modules/skus/components/controls/sku-multi-select-control";
import { typography } from "@/lib/typography";
import type { DateRange } from "react-day-picker";

interface SkuSelectionSalesExcelDialogViewProps {
  picks: readonly SkuMultiSelectPick[];
  onPicksChange: (picks: SkuMultiSelectPick[]) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuSalesExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuSalesExcelMetric[]) => void;
  isExporting: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSelectionSalesExcelDialogView({
  picks,
  onPicksChange,
  dateRange,
  onDateRangeChange,
  selectedMetrics,
  onSelectedMetricsChange,
  isExporting,
  onDownload,
  onCancel,
}: SkuSelectionSalesExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const hasMetrics = selectedMetrics.length > 0;
  const hasSkus = picks.length > 0;

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Excel продажів за обраними SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Оберіть до 100 товарів (можна з різних конкурентів), метрики і період.
          У файлі також будуть частки за період.
        </p>

        <SkuMultiSelectControl
          value={picks}
          onChange={onPicksChange}
          disabled={isExporting}
          searchInputId="sku-selection-sales-search"
        />

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
            disabled={(date) => date > new Date() || isExporting}
            numberOfMonths={1}
          />
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isExporting}
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
