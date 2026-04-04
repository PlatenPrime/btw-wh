import { apiClient } from "@/lib/apiClient";
import type { StockComparisonResponse } from "@/modules/stock-comparison/api/types";

export const getSkuKonkProdStockChartData = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<StockComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<StockComparisonResponse>(
    `sku-slices/konk-prod/stock-chart-data?${params.toString()}`,
    { signal },
  );
  return res.data;
};
