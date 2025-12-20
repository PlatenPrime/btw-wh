import { getOneArtByArtikul } from "@/modules/arts/api/services/queries/getOneArtByArtikul";
import type { ArtResponse } from "@/modules/arts/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useOneArtQuery(artikul?: string) {
  return useQuery<ArtResponse>({
    queryKey: ["art", { artikul }],
    queryFn: ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing in URL");
      return getOneArtByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

