import {
  SKU_STOCK_EXCEL_METRICS,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs/types/sku-stock-excel-metrics";

export const SKU_STOCK_EXCEL_METRIC_LABELS: Record<
  SkuStockExcelMetric,
  string
> = {
  stock: "Залишок",
  price: "Ціна",
};

export const DEFAULT_SKU_STOCK_EXCEL_METRICS: readonly SkuStockExcelMetric[] =
  SKU_STOCK_EXCEL_METRICS;

/** Канонічний порядок: stock → price. */
export function normalizeSkuStockExcelMetrics(
  metrics: readonly SkuStockExcelMetric[],
): SkuStockExcelMetric[] {
  const selected = new Set(metrics);
  return SKU_STOCK_EXCEL_METRICS.filter((metric) => selected.has(metric));
}
