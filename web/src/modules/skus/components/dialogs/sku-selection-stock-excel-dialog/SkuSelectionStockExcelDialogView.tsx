import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  IncludeImagesControl,
  SkuStockExcelMetricsControl,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs";
import { hasSkuSelection } from "@/modules/excel-jobs/utils/build-sku-selection-params";
import {
  SkuMultiSelectControl,
  type SkuMultiSelectPick,
  type SkuMultiSelectQuery,
} from "@/modules/skus/components/controls/sku-multi-select-control";
import { typography } from "@/lib/typography";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";

interface SkuSelectionStockExcelDialogViewProps {
  picks: readonly SkuMultiSelectPick[];
  onPicksChange: (picks: SkuMultiSelectPick[]) => void;
  selectAll: boolean;
  onSelectAllChange: (selectAll: boolean) => void;
  onSelectionQueryChange: (query: SkuMultiSelectQuery) => void;
  onMatchedTotalChange: (total: number) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuStockExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuStockExcelMetric[]) => void;
  includeImages: boolean;
  onIncludeImagesChange: (value: boolean) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSelectionStockExcelDialogView({
  picks,
  onPicksChange,
  selectAll,
  onSelectAllChange,
  onSelectionQueryChange,
  onMatchedTotalChange,
  dateRange,
  onDateRangeChange,
  selectedMetrics,
  onSelectedMetricsChange,
  includeImages,
  onIncludeImagesChange,
  isDownloading,
  onDownload,
  onCancel,
}: SkuSelectionStockExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid = from !== undefined && to !== undefined && from <= to;
  const hasMetrics = selectedMetrics.length > 0;
  const hasSkus = hasSkuSelection({
    selectAll,
    pickCount: picks.length,
  });
  const maxSelectableDate = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Excel залишків за обраними SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Відфільтруйте за конкурентом/виробником, знайдіть товари (можна з
          різних конкурентів), оберіть чекбоксами або «Вибрати всі», метрики і
          період. Файл готується через excel-jobs.
        </p>

        <SkuMultiSelectControl
          layout="dialog"
          value={picks}
          onChange={onPicksChange}
          selectAll={selectAll}
          onSelectAllChange={onSelectAllChange}
          onSelectionQueryChange={onSelectionQueryChange}
          onMatchedTotalChange={onMatchedTotalChange}
          disabled={isDownloading}
          searchInputId="sku-selection-stock-search"
        />

        <div className="grid grid-cols-2 items-start gap-4">
          <SkuStockExcelMetricsControl
            value={selectedMetrics}
            onChange={onSelectedMetricsChange}
            disabled={isDownloading}
          />
          <IncludeImagesControl
            checked={includeImages}
            onCheckedChange={onIncludeImagesChange}
            disabled={isDownloading}
            id="sku-selection-stock-include-images"
            label="Додати фото"
          />
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > maxSelectableDate || isDownloading}
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
