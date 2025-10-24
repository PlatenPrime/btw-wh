import { apiClient } from "@/lib/apiClient";
import type { ArtResponse } from "@/modules/arts/api/types/dto";

export const getOneArtByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<ArtResponse> => {
  const res = await apiClient.get<ArtResponse>(`/arts/artikul/${artikul}`, {
    signal,
  });
  return res.data;
};
