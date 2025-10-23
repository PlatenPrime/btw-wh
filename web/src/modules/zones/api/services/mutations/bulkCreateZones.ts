import { apiClient } from "@/lib/apiClient";
import type { BulkCreateZoneDto, BulkCreateZoneResponse } from "@/modules/zones/api/types";

export const bulkCreateZones = async (data: BulkCreateZoneDto): Promise<BulkCreateZoneResponse> => {
  const res = await apiClient.post<BulkCreateZoneResponse>("/zones/bulk", data);
  return res.data;
};

