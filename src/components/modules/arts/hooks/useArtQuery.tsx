// hooks/useArtQuery.ts
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getArtByArtikul } from "@/components/modules/arts/services/arts";
import type { Art } from "@/components/modules/arts/types/types";

export function useArtQuery() {
  const { artikul } = useParams<{ artikul: string }>();

  return useQuery<Art>({
    queryKey: ["art", artikul],
    queryFn: ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing in URL");
      return getArtByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
