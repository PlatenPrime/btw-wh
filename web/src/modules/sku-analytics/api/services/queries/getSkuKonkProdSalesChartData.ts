import { apiClient } from "@/lib/apiClient";
import { appendSkugrIds } from "@/modules/sku-analytics/api/utils/appendSkugrIds";
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
    `sku-chart-reports/konk-prod/sales?${params.toString()}`,
    { signal },
  );
  return res.data;
};
