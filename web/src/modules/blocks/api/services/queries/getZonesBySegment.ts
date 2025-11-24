import { apiClient } from "@/lib/apiClient";
import type { ZonesBySegmentResponse } from "@/modules/blocks/api/types";

export const getZonesBySegment = async ({
  segId,
  signal,
}: {
  segId: string;
  signal?: AbortSignal;
}): Promise<ZonesBySegmentResponse> => {
  const res = await apiClient.get<ZonesBySegmentResponse>(`/segs/${segId}/zones`, {
    signal,
  });

  return res.data;
};

