import { apiClient } from "@/lib/apiClient";
import type { ZoneResponse } from "@/modules/zones/api/types";

export const getZoneByTitle = async ({
  title,
  signal,
}: {
  title: string;
  signal?: AbortSignal;
}): Promise<ZoneResponse> => {
  const res = await apiClient.get<ZoneResponse>(`/zones/title/${title}`, {
    signal,
  });

  return res.data;
};



