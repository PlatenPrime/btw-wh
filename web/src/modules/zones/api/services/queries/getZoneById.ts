import { apiClient } from "@/lib/apiClient";
import type { ZoneResponse } from "@/modules/zones/api/types";

export const getZoneById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<ZoneResponse> => {
  const res = await apiClient.get<ZoneResponse>(`/zones/${id}`, {
    signal,
  });

  return res.data;
};

