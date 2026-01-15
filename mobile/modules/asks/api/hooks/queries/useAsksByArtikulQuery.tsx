import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { getAsksByArtikul } from "@/modules/asks/api/services/queries/getAsksByArtikul";

export interface UseAsksByArtikulQueryParams {
  artikul: string;
  enabled?: boolean;
}

export function useAsksByArtikulQuery({
  artikul,
  enabled = true,
}: UseAsksByArtikulQueryParams) {
  const debouncedArtikul = useDebounce(artikul, 300);

  return useQuery<GetAsksByArtikulResponse>({
    queryKey: ["asks", "by-artikul", { artikul: debouncedArtikul }],
    queryFn: ({ signal }) =>
      getAsksByArtikul({
        artikul: debouncedArtikul,
        signal,
      }),
    enabled: enabled && !!debouncedArtikul,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}
