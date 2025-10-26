import { apiClient } from "@/lib/apiClient";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export interface ArtsByZoneResponse {
  data: ArtDto[];
  total: number;
}

export const getArtsByZone = async (
  zone: string,
): Promise<ArtsByZoneResponse> => {
  const res = await apiClient.get<ArtsByZoneResponse>(`/arts/zone/${zone}`);
  return res.data;
};
