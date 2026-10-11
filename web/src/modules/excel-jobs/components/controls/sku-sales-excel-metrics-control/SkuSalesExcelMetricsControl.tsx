import { normalizeSkuSalesExcelMetrics } from "@/modules/excel-jobs/constants/sku-sales-excel-metrics";
import type { SkuSalesExcelMetric } from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import { useCallback, useMemo } from "react";
import { SkuSalesExcelMetricsControlView } from "./SkuSalesExcelMetricsControlView";

export interface SkuSalesExcelMetricsControlProps {
  value: readonly SkuSalesExcelMetric[];
  onChange: (metrics: SkuSalesExcelMetric[]) => void;
  disabled?: boolean;
}

export function SkuSalesExcelMetricsControl({
  value,
  onChange,
  disabled = false,
}: SkuSalesExcelMetricsControlProps) {
  const selected = useMemo(() => new Set(value), [value]);

  const handleToggle = useCallback(
    (metric: SkuSalesExcelMetric) => {
      const next = new Set(selected);
      if (next.has(metric)) {
        next.delete(metric);
      } else {
        next.add(metric);
      }
      onChange(normalizeSkuSalesExcelMetrics(Array.from(next)));
    },
    [onChange, selected],
  );

  return (
    <SkuSalesExcelMetricsControlView
      selected={selected}
      onToggle={handleToggle}
      disabled={disabled}
    />
  );
}
