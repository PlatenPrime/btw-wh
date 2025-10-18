import { useQuery } from "@tanstack/react-query";
import type { BtradeArtInfoDto } from "../../types/dto";

export interface UseBtradeArtDataQueryParams {
  artikul: string;
  getBtradeArtDataByArtikul: (
    artikul: string,
    signal?: AbortSignal
  ) => Promise<BtradeArtInfoDto>;
}

export function useBtradeArtDataQuery({
  artikul,
  getBtradeArtDataByArtikul,
}: UseBtradeArtDataQueryParams) {
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
    staleTime: 5 * 60 * 1000,
  });
}
