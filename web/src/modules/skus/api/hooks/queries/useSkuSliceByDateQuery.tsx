import { getSkuSliceByDate } from "@/modules/skus/api/services/queries/getSkuSliceByDate";
import { useQuery } from "@tanstack/react-query";

const DATE_API_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

export interface UseSkuSliceByDateQueryParams {
  skuId: string | undefined;
  date: string;
  enabled?: boolean;
}

export function useSkuSliceByDateQuery({
  skuId,
  date,
  enabled = true,
}: UseSkuSliceByDateQueryParams) {
  const isDateValid = DATE_API_FORMAT.test(date);

  return useQuery({
    queryKey: ["sku-slices", "point", skuId, date],
    queryFn: ({ signal }) => getSkuSliceByDate(skuId!, date, signal),
    enabled: !!skuId && isDateValid && enabled,
    retry: false,
    staleTime: 30 * 1000,
  });
}
