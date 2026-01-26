import { getBtradeArtDataByArtikul } from "@/modules/arts/api/services/queries/getBtradeArtDataByArtikul";
import type { BtradeArtInfoResponse } from "@/modules/arts/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useBtradeArtDataQuery(artikul: string | undefined) {
  return useQuery<BtradeArtInfoResponse>({
    queryKey: ["btradeArtInfo", { artikul: artikul ?? "" }],
    queryFn: async ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing");
      return getBtradeArtDataByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
