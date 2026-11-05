import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  IncludeImagesControl,
  SkuSalesExcelMetricsControl,
  type SkuSalesExcelMetric,
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

interface SkuSelectionSalesExcelDialogViewProps {
  picks: readonly SkuMultiSelectPick[];
  onPicksChange: (picks: SkuMultiSelectPick[]) => void;
  selectAll: boolean;
  onSelectAllChange: (selectAll: boolean) => void;
  onSelectionQueryChange: (query: SkuMultiSelectQuery) => void;
  onMatchedTotalChange: (total: number) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedMetrics: readonly SkuSalesExcelMetric[];
  onSelectedMetricsChange: (metrics: SkuSalesExcelMetric[]) => void;
  includeImages: boolean;
  onIncludeImagesChange: (value: boolean) => void;
  isExporting: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkuSelectionSalesExcelDialogView({
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
  isExporting,
  onDownload,
  onCancel,
}: SkuSelectionSalesExcelDialogViewProps) {
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
        <DialogTitle>Excel продажів за обраними SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Відфільтруйте за конкурентом/виробником, знайдіть товари (можна з
          різних конкурентів), оберіть чекбоксами або «Вибрати всі», метрики і
          період. У файлі також будуть частки за період.
        </p>

        <SkuMultiSelectControl
          layout="dialog"
          value={picks}
          onChange={onPicksChange}
          selectAll={selectAll}
          onSelectAllChange={onSelectAllChange}
          onSelectionQueryChange={onSelectionQueryChange}
          onMatchedTotalChange={onMatchedTotalChange}
          disabled={isExporting}
          searchInputId="sku-selection-sales-search"
        />

        <div className="grid grid-cols-2 items-start gap-4">
          <SkuSalesExcelMetricsControl
            value={selectedMetrics}
            onChange={onSelectedMetricsChange}
            disabled={isExporting}
          />
          <IncludeImagesControl
            checked={includeImages}
            onCheckedChange={onIncludeImagesChange}
            disabled={isExporting}
            id="sku-selection-sales-include-images"
            label="Додати фото"
          />
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > maxSelectableDate || isExporting}
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
