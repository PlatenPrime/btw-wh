import { apiClient } from "@/lib/apiClient";
import type { GetZonesParams, ZonesResponseDto } from "@/modules/zones/api/types";

export const getZones = async ({
  page,
  limit,
  search = "",
  sortBy = "sector",
  sortOrder = "asc",
  signal,
}: GetZonesParams): Promise<ZonesResponseDto> => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    sortBy,
    sortOrder,
  });

  const res = await apiClient.get<ZonesResponseDto>(`/zones?${query.toString()}`, {
    signal,
  });

  return res.data;
};

