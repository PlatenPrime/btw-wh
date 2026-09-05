import { getAirClientSkugrPending } from "@/modules/skugrs/api/services/queries/getAirClientSkugrPending";
import { useQuery } from "@tanstack/react-query";

export interface UseAirClientSkugrPendingQueryParams {
  enabled?: boolean;
}

export function useAirClientSkugrPendingQuery({
  enabled = true,
}: UseAirClientSkugrPendingQueryParams = {}) {
  return useQuery({
    queryKey: ["skugrs", "client", "air", "pending"],
    queryFn: ({ signal }) => getAirClientSkugrPending(signal),
    enabled,
    staleTime: 0,
  });
}
