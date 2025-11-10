import { useQuery } from "@tanstack/react-query";
import { getPulls } from "@/modules/pulls/api/services/queries/getPulls";
import type { PullsResponse, PullsResponsePayload } from "@/modules/pulls/api/types";

export interface UsePullsQueryParams {
  enabled?: boolean;
}

export function usePullsQuery({ enabled = true }: UsePullsQueryParams = {}) {
  return useQuery<PullsResponse, Error, PullsResponsePayload>({
    queryKey: ["pulls"],
    queryFn: ({ signal }) => getPulls({ signal }),
    select: (response) => response.data,
    enabled,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnMount: "always",
    retry: 1,
  });
}