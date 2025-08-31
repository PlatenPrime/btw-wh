import { useQuery } from "@tanstack/react-query";
import { getAskById } from "../services/getAskById";
import type { AskDto } from "../types/dto";

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
