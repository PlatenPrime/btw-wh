import { getPosesByArtikul } from "@/modules/poses/api/services/queries/getPosesByArtikul";
import { useQuery } from "@tanstack/react-query";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";

export function usePosesByArtikulQuery(artikul: string) {
  return useQuery<GetPosesByArtikulResponse>({
    queryKey: ["poses", { by: "artikul", artikul }],
    queryFn: ({ signal }) => getPosesByArtikul(artikul, signal),
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000,
  });
}

