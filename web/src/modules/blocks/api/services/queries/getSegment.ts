import { apiClient } from "@/lib/apiClient";
import type { SegmentResponse } from "@/modules/blocks/api/types";

export const getSegment = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<SegmentResponse> => {
  const res = await apiClient.get<SegmentResponse>(`/segs/${id}`, {
    signal,
  });

  return res.data;
};

