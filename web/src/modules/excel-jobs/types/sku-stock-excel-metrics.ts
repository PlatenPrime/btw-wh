export const SKU_STOCK_EXCEL_METRICS = ["stock", "price"] as const;

export type SkuStockExcelMetric = (typeof SKU_STOCK_EXCEL_METRICS)[number];
