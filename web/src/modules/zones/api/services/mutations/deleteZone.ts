import { apiClient } from "@/lib/apiClient";
import type { DeleteZoneResponse } from "@/modules/zones/api/types";

export const deleteZone = async (id: string): Promise<DeleteZoneResponse> => {
  const res = await apiClient.delete<DeleteZoneResponse>(`/zones/${id}`);
  return res.data;
};


