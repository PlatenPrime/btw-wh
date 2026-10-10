import { getSkuSliceDayInvalid } from "@/modules/sku-analytics/api/services/queries/getSkuSliceDayInvalid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuSliceDayInvalidQueryParams {
  konkName: string;
  date: string;
  page: number;
  limit: number;
}

export function useSkuSliceDayInvalidQuery({
  konkName,
  date,
  page,
  limit,
}: UseSkuSliceDayInvalidQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "day-invalid", konkName, date, page, limit],
    queryFn: ({ signal }) =>
      getSkuSliceDayInvalid({
        konkName,
        date,
        page,
        limit,
        signal,
      }),
    enabled: Boolean(konkName && date),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
