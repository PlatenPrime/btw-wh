import { getSkuSliceRange } from "@/modules/skus/api/services/queries/getSkuSliceRange";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuSliceRangeQueryParams {
  skuId: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuSliceRangeQuery({
  skuId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuSliceRangeQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "range", skuId, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuSliceRange(skuId!, dateFrom, dateTo, signal),
    enabled: !!skuId && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
