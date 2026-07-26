import { getAirClientPending } from "@/modules/sku-analytics/api/services/queries/getAirClientPending";
import { useQuery } from "@tanstack/react-query";

export interface UseAirClientPendingQueryParams {
  enabled?: boolean;
}

export function useAirClientPendingQuery({
  enabled = true,
}: UseAirClientPendingQueryParams = {}) {
  return useQuery({
    queryKey: ["sku-slices", "client", "air", "pending"],
    queryFn: ({ signal }) => getAirClientPending(signal),
    enabled,
    staleTime: 0,
  });
}
