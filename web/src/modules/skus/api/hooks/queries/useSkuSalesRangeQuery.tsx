import { getSkuSalesRange } from "@/modules/skus/api/services/queries/getSkuSalesRange";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuSalesRangeQueryParams {
  skuId: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuSalesRangeQuery({
  skuId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuSalesRangeQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "sales-range", skuId, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuSalesRange(skuId!, dateFrom, dateTo, signal),
    enabled: !!skuId && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
