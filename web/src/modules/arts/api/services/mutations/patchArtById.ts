import { apiClient } from "@/lib/apiClient";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export interface PatchArtRequest {
  limit?: number;
  prodName?: string;
}

export const patchArtById = async (
  id: string,
  data: PatchArtRequest,
): Promise<ArtDto> => {
  const res = await apiClient.patch<ArtDto>(`/arts/${id}`, data);
  return res.data;
};
