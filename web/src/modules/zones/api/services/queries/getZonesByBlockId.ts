import { apiClient } from "@/lib/apiClient";
import type { ZonesResponseDto } from "@/modules/zones/api/types";

export const getZonesByBlockId = async ({
  blockId,
  signal,
}: {
  blockId: string;
  signal?: AbortSignal;
}): Promise<ZonesResponseDto> => {
  const res = await apiClient.get<ZonesResponseDto>(`/zones/by-block/${blockId}`, {
    signal,
  });

  return res.data;
};

