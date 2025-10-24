import { apiClient } from "@/lib/apiClient";
import type {
  BulkCreateZoneDto,
  UpsertZonesResponse,
} from "@/modules/zones/api/types";

export const upsertZones = async (
  data: BulkCreateZoneDto,
): Promise<UpsertZonesResponse> => {
  const res = await apiClient.post<UpsertZonesResponse>("/zones/upsert", data);
  return res.data;
};
