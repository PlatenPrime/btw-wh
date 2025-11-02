import { useQuery } from "@tanstack/react-query";
import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";
import { getPulls } from "@/modules/pulls/api/services/queries/getPulls";

export interface UsePullsQueryParams {
  enabled?: boolean;
  refetchInterval?: number;
}

export function usePullsQuery({
  enabled = true,
  refetchInterval = 30000, // 30 seconds default
}: UsePullsQueryParams = {}) {
  return useQuery<GetPullsResponse>({
    queryKey: ["pulls"],
    queryFn: ({ signal }) => getPulls({ signal }),
    enabled,
    refetchInterval: enabled ? refetchInterval : false,
    staleTime: 10000, // 10 seconds
  });
}

