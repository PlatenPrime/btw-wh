import { useQuery } from "@tanstack/react-query";
import { getBtradeInfoByArtikul } from "../api/getBtradeInfoByArtikul";

export function useBtradeArtInfoQuery(artikul: string) {
    if (!artikul) {
        throw new Error("Artikul is required for useBtradeArtInfoQuery");
    }

  return useQuery({
    queryKey: ["btradeArtInfo", artikul],
    queryFn: async ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing");
     return getBtradeInfoByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}