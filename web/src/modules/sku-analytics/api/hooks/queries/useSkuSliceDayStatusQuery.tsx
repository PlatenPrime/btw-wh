import { getSkuSliceDayStatus } from "@/modules/sku-analytics/api/services/queries/getSkuSliceDayStatus";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuSliceDayStatusQueryParams {
  konkName: string;
  date: string;
}

export function useSkuSliceDayStatusQuery({
  konkName,
  date,
}: UseSkuSliceDayStatusQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "day-status", konkName, date],
    queryFn: ({ signal }) =>
      getSkuSliceDayStatus({
        konkName,
        date,
        signal,
      }),
    enabled: Boolean(konkName && date),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
