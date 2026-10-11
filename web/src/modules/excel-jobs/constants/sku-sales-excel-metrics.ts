import {
  SKU_SALES_EXCEL_METRICS,
  type SkuSalesExcelMetric,
} from "@/modules/excel-jobs/types/sku-sales-excel-metrics";

export const SKU_SALES_EXCEL_METRIC_LABELS: Record<
  SkuSalesExcelMetric,
  string
> = {
  sales: "Продажі",
  price: "Ціна",
  revenue: "Виручка",
};

export const DEFAULT_SKU_SALES_EXCEL_METRICS: readonly SkuSalesExcelMetric[] =
  SKU_SALES_EXCEL_METRICS;

/** Канонічний порядок: sales → price → revenue. */
export function normalizeSkuSalesExcelMetrics(
  metrics: readonly SkuSalesExcelMetric[],
): SkuSalesExcelMetric[] {
  const selected = new Set(metrics);
  return SKU_SALES_EXCEL_METRICS.filter((metric) => selected.has(metric));
}
