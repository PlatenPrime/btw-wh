import { apiClient } from "@/lib/apiClient";
import type { CreateZoneDto, ZoneResponse } from "@/modules/zones/api/types";

export const createZone = async (data: CreateZoneDto): Promise<ZoneResponse> => {
  const res = await apiClient.post<ZoneResponse>("/zones", data);
  return res.data;
};



