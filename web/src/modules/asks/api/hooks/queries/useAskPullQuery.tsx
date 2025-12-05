import { getAskPull } from "@/modules/asks/api/services/queries/getAskPull";
import type { GetAskPullByIdResponse } from "@/modules/asks/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export interface UseAskPullQueryParams {
  askId: string;
  enabled?: boolean;
}

export function useAskPullQuery({ askId, enabled = true }: UseAskPullQueryParams) {
  return useQuery<GetAskPullByIdResponse>({
    queryKey: ["asks", askId, "pull"],
    queryFn: () => getAskPull(askId),
    enabled: enabled && !!askId,
    staleTime: 0, // Всегда актуальные данные
  });
}

