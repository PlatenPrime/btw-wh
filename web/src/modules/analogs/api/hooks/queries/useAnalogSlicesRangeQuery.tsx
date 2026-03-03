import { getAnalogSlicesRange } from "@/modules/analogs/api/services/queries/getAnalogSlicesRange";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogSlicesRangeQueryParams {
  analogId: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useAnalogSlicesRangeQuery({
  analogId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseAnalogSlicesRangeQueryParams) {
  return useQuery({
    queryKey: ["analog-slices", "range", analogId, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getAnalogSlicesRange(analogId!, dateFrom, dateTo, signal),
    enabled: !!analogId && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
