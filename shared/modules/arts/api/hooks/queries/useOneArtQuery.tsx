import { useQuery } from "@tanstack/react-query";
import type { ArtDto } from "../../types/dto";

export interface UseOneArtQueryParams {
  artikul?: string;
  getOneArtByArtikul: (
    artikul: string,
    signal?: AbortSignal
  ) => Promise<ArtDto>;
}

export function useOneArtQuery({
  artikul,
  getOneArtByArtikul,
}: UseOneArtQueryParams) {
  return useQuery<ArtDto>({
    queryKey: ["art", { artikul }],
    queryFn: ({ signal }) => {
      if (!artikul) throw new Error("Artikul is missing in URL");
      return getOneArtByArtikul(artikul, signal);
    },
    enabled: !!artikul,
    staleTime: 5 * 60 * 1000,
  });
}
