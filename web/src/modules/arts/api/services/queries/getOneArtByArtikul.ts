import { apiClient } from "@/lib/apiClient";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export const getOneArtByArtikul = async (
  artikul: string,
  signal?: AbortSignal
): Promise<ArtDto> => {
  const res = await apiClient.get<ArtDto>(`/arts/artikul/${artikul}`, {
    signal,
  });
  return res.data;
};
