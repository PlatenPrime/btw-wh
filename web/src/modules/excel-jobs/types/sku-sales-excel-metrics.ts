export const SKU_SALES_EXCEL_METRICS = [
  "sales",
  "price",
  "revenue",
] as const;

export type SkuSalesExcelMetric = (typeof SKU_SALES_EXCEL_METRICS)[number];
