import { useQuery } from "@tanstack/react-query";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { getAskById } from "@/modules/asks/api/services/queries/getAskById";

export interface UseAskQueryParams {
  id: string;
  enabled?: boolean;
}

export function useAskQuery({ id, enabled = true }: UseAskQueryParams) {
  return useQuery<AskDto>({
    queryKey: ["asks", id],
    queryFn: () => getAskById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
