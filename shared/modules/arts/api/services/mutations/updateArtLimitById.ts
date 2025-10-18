import type { AxiosInstance } from "axios";
import type { ArtDto } from "../../types/dto";

export interface UpdateArtLimitRequest {
  limit: number;
}

/**
 * Update art limit by id service factory
 */
export const createUpdateArtLimitByIdService = (apiClient: AxiosInstance) => {
  return async (id: string, data: UpdateArtLimitRequest): Promise<ArtDto> => {
    const res = await apiClient.patch<ArtDto>(`/arts/${id}/limit`, data);
    return res.data;
  };
};
