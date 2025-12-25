import { getAskPull } from "@/modules/asks/api/services/queries/getAskPull";
import type { GetAskPullByIdResponse } from "@/modules/asks/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export interface UseAskPullQueryParams {
  id: string;
  enabled?: boolean;
}

export function useAskPullQuery({ id, enabled = true }: UseAskPullQueryParams) {
  return useQuery<GetAskPullByIdResponse>({
    queryKey: ["asks", id, "pull"],
    queryFn: ({ signal }) => getAskPull(id, signal),
    enabled: enabled && !!id,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}

