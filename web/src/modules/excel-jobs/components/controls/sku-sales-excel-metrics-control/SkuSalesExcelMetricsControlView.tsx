import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  SKU_SALES_EXCEL_METRIC_LABELS,
} from "@/modules/excel-jobs/constants/sku-sales-excel-metrics";
import {
  SKU_SALES_EXCEL_METRICS,
  type SkuSalesExcelMetric,
} from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import { typography } from "@/lib/typography";

interface SkuSalesExcelMetricsControlViewProps {
  selected: ReadonlySet<SkuSalesExcelMetric>;
  onToggle: (metric: SkuSalesExcelMetric) => void;
  disabled?: boolean;
}

export function SkuSalesExcelMetricsControlView({
  selected,
  onToggle,
  disabled = false,
}: SkuSalesExcelMetricsControlViewProps) {
  return (
    <div className="grid gap-2">
      <p className={typography.formLabel}>Метрики</p>
      <div className="grid gap-2">
        {SKU_SALES_EXCEL_METRICS.map((metric) => {
          const id = `sku-sales-excel-metric-${metric}`;
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
                {SKU_SALES_EXCEL_METRIC_LABELS[metric]}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
