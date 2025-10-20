import { apiClient } from "@/lib/apiClient";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export interface UpdateArtLimitRequest {
  limit: number;
}

export const updateArtLimitById = async (
  id: string,
  data: UpdateArtLimitRequest,
): Promise<ArtDto> => {
  const res = await apiClient.patch<ArtDto>(`/arts/${id}/limit`, data);
  return res.data;
};
