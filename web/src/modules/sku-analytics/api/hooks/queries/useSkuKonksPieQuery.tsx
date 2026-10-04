import { getSkuKonksPieData } from "@/modules/sku-analytics/api/services/queries/getSkuKonksPieData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuKonksPieQueryParams {
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuKonksPieQuery({
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuKonksPieQueryParams) {
  return useQuery({
    queryKey: ["sku-chart-reports", "konks-pie", prod, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuKonksPieData(prod, dateFrom, dateTo, signal),
    enabled: !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
