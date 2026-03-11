import { getAnalogSalesRange } from "@/modules/analogs/api/services/queries/getAnalogSalesRange";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogSalesRangeQueryParams {
  analogId: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useAnalogSalesRangeQuery({
  analogId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseAnalogSalesRangeQueryParams) {
  return useQuery({
    queryKey: ["analog-slices", "sales-range", analogId, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getAnalogSalesRange(analogId!, dateFrom, dateTo, signal),
    enabled: !!analogId && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
