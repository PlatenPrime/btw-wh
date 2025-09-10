import { getAskById } from "@/modules/asks/api/services/queries/getAskById";
import type { GetAskByIdResponse } from "@/modules/asks/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export interface UseAskQueryParams {
  id: string;
  enabled?: boolean;
}

export function useAskQuery({ id, enabled = true }: UseAskQueryParams) {
  return useQuery<GetAskByIdResponse>({
    queryKey: ["asks", id],
    queryFn: () => getAskById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
