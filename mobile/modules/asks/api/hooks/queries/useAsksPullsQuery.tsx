import { getAsksPulls } from "@/modules/asks/api/services/queries/getAsksPulls";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useAsksPullsQuery(enabled = true) {
  return useQuery<GetAsksPullsResponse>({
    queryKey: ["asks", "pulls"],
    queryFn: ({ signal }) => getAsksPulls(signal),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

