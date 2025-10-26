import { apiClient } from "@/lib/apiClient";
import type { UpdateZoneDto, ZoneResponse } from "@/modules/zones/api/types";

export const updateZone = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateZoneDto;
}): Promise<ZoneResponse> => {
  const res = await apiClient.put<ZoneResponse>(`/zones/${id}`, data);
  return res.data;
};



