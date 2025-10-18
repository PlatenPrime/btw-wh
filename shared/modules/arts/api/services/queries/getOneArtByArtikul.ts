import type { AxiosInstance } from "axios";
import type { ArtDto } from "../../types/dto";

/**
 * Get one art by artikul service factory
 */
export const createGetOneArtByArtikulService = (apiClient: AxiosInstance) => {
  return async (artikul: string, signal?: AbortSignal): Promise<ArtDto> => {
    const res = await apiClient.get<ArtDto>(`/arts/artikul/${artikul}`, {
      signal,
    });
    return res.data;
  };
};
