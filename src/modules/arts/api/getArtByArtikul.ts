import { apiClient } from "@/lib/apiClient";
import type { ArtDto } from "../types/dto";

export const getArtByArtikul = async (
  artikul: string,
  signal?: AbortSignal
): Promise<ArtDto> => {
  const res = await apiClient.get<ArtDto>(`/arts/artikul/${artikul}`, {
    signal,
  });
  return res.data;
};
