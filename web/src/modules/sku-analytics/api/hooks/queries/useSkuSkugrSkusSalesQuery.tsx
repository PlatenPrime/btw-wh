import { getSkuSkugrSkusSalesData } from "@/modules/sku-analytics/api/services/queries/getSkuSkugrSkusSalesData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuSkugrSkusSalesQueryParams {
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuSkugrSkusSalesQuery({
  skugrId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuSkugrSkusSalesQueryParams) {
  return useQuery({
    queryKey: [
      "sku-sales-reports",
      "skugr-skus-sales",
      skugrId,
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      getSkuSkugrSkusSalesData(skugrId, dateFrom, dateTo, signal),
    enabled: !!skugrId && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
