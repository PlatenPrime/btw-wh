import { apiClient } from "@/lib/apiClient";
import type { SalesComparisonResponse } from "@/modules/sales/api/types";

export const getSkuKonkProdSalesChartData = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SalesComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<SalesComparisonResponse>(
    `sku-slices/konk-prod/sales-chart-data?${params.toString()}`,
    { signal },
  );
  return res.data;
};
