import { getSkuKonkProdSalesChartData } from "@/modules/sku-slices/api/services/queries/getSkuKonkProdSalesChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuKonkProdSalesChartQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuKonkProdSalesChartQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuKonkProdSalesChartQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "konk-prod-sales-chart", konk, prod, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuKonkProdSalesChartData(konk, prod, dateFrom, dateTo, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
