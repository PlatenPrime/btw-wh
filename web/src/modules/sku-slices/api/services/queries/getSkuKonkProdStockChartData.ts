import { apiClient } from "@/lib/apiClient";
import { appendSkugrIds } from "@/modules/sku-slices/api/utils/appendSkugrIds";
import type { StockComparisonResponse } from "@/modules/stock-comparison/api/types";

export interface GetSkuKonkProdStockChartDataParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds?: string[];
  signal?: AbortSignal;
}

export const getSkuKonkProdStockChartData = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  signal,
}: GetSkuKonkProdStockChartDataParams): Promise<StockComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  appendSkugrIds(params, skugrIds);
  const res = await apiClient.get<StockComparisonResponse>(
    `sku-slices/konk-prod/stock-chart-data?${params.toString()}`,
    { signal },
  );
  return res.data;
};
