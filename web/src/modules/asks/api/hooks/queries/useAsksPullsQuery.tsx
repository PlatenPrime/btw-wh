import { useQuery } from "@tanstack/react-query";
import { getAsksPulls } from "@/modules/asks/api/services/queries/getAsksPulls";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";

export function useAsksPullsQuery() {
  return useQuery<GetAsksPullsResponse>({
    queryKey: ["asks", "pulls"],
    queryFn: () => getAsksPulls(),
    staleTime: 0, // Всегда актуальные данные
  });
}

