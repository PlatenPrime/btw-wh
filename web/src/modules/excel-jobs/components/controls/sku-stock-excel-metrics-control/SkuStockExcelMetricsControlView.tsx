import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SKU_STOCK_EXCEL_METRIC_LABELS } from "@/modules/excel-jobs/constants/sku-stock-excel-metrics";
import {
  SKU_STOCK_EXCEL_METRICS,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import { typography } from "@/lib/typography";

interface SkuStockExcelMetricsControlViewProps {
  selected: ReadonlySet<SkuStockExcelMetric>;
  onToggle: (metric: SkuStockExcelMetric) => void;
  disabled?: boolean;
}

export function SkuStockExcelMetricsControlView({
  selected,
  onToggle,
  disabled = false,
}: SkuStockExcelMetricsControlViewProps) {
  return (
    <div className="grid gap-2">
      <p className={typography.formLabel}>Метрики</p>
      <div className="grid gap-2">
        {SKU_STOCK_EXCEL_METRICS.map((metric) => {
          const id = `sku-stock-excel-metric-${metric}`;
          return (
            <div key={metric} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selected.has(metric)}
                onCheckedChange={() => onToggle(metric)}
                disabled={disabled}
                className="shrink-0"
              />
              <Label htmlFor={id} className="cursor-pointer font-normal">
                {SKU_STOCK_EXCEL_METRIC_LABELS[metric]}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
