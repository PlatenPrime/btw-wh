import { apiClient } from "@/lib/apiClient";
import type { StockComparisonResponse } from "@/modules/stock-comparison/api/types";

export const getStockComparison = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<StockComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<StockComparisonResponse>(
    `analog-slices/konk-btrade/stock-comparison?${params.toString()}`,
    { signal },
  );
  return res.data;
};
