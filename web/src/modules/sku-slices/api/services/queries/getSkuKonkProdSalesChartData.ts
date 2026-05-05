import { apiClient } from "@/lib/apiClient";
import { appendSkugrIds } from "@/modules/sku-slices/api/utils/appendSkugrIds";
import type { SalesComparisonResponse } from "@/modules/sales/api/types";

export interface GetSkuKonkProdSalesChartDataParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds?: string[];
  signal?: AbortSignal;
}

export const getSkuKonkProdSalesChartData = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  signal,
}: GetSkuKonkProdSalesChartDataParams): Promise<SalesComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  appendSkugrIds(params, skugrIds);
  const res = await apiClient.get<SalesComparisonResponse>(
    `sku-slices/konk-prod/sales-chart-data?${params.toString()}`,
    { signal },
  );
  return res.data;
};
