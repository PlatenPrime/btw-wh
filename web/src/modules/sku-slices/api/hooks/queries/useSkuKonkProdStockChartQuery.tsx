import { getSkuKonkProdStockChartData } from "@/modules/sku-slices/api/services/queries/getSkuKonkProdStockChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuKonkProdStockChartQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuKonkProdStockChartQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuKonkProdStockChartQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "konk-prod-stock-chart", konk, prod, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuKonkProdStockChartData(konk, prod, dateFrom, dateTo, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
