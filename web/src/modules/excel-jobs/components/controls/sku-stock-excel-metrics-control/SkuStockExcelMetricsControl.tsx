import { normalizeSkuStockExcelMetrics } from "@/modules/excel-jobs/constants/sku-stock-excel-metrics";
import type { SkuStockExcelMetric } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import { useCallback, useMemo } from "react";
import { SkuStockExcelMetricsControlView } from "./SkuStockExcelMetricsControlView";

export interface SkuStockExcelMetricsControlProps {
  value: readonly SkuStockExcelMetric[];
  onChange: (metrics: SkuStockExcelMetric[]) => void;
  disabled?: boolean;
}

export function SkuStockExcelMetricsControl({
  value,
  onChange,
  disabled = false,
}: SkuStockExcelMetricsControlProps) {
  const selected = useMemo(() => new Set(value), [value]);

  const handleToggle = useCallback(
    (metric: SkuStockExcelMetric) => {
      const next = new Set(selected);
      if (next.has(metric)) {
        next.delete(metric);
      } else {
        next.add(metric);
      }
      onChange(normalizeSkuStockExcelMetrics(Array.from(next)));
    },
    [onChange, selected],
  );

  return (
    <SkuStockExcelMetricsControlView
      selected={selected}
      onToggle={handleToggle}
      disabled={disabled}
    />
  );
}
