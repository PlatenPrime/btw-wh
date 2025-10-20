import { getBtradeArtDataByArtikul } from "@/modules/arts/api/services/queries/getBtradeArtDataByArtikul";
import { useQuery } from "@tanstack/react-query";

export function useBtradeArtDataQuery(artikul: string) {
  if (!artikul) {
    throw new Error("Artikul is required for useBtradeArtDataQuery");
  }

  return useQuery({
    queryKey: ["btradeArtInfo", { artikul }],
    queryFn: async ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing");
      return getBtradeArtDataByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
