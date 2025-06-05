// hooks/useArtQuery.ts
import { getArtByArtikul } from "@/modules/arts/api/getArtByArtikul";
import type { ArtDto } from "@/modules/arts/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useArtQuery(artikul?: string) {
  return useQuery<ArtDto>({
    queryKey: ["art", artikul],
    queryFn: ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing in URL");
      return getArtByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
