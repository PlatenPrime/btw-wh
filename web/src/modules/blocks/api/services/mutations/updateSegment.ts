import { apiClient } from "@/lib/apiClient";
import type { SegmentResponse, UpdateSegmentDto } from "@/modules/blocks/api/types";

export const updateSegment = async ({
  id,
  data,
  signal,
}: {
  id: string;
  data: UpdateSegmentDto;
  signal?: AbortSignal;
}): Promise<SegmentResponse> => {
  const res = await apiClient.put<SegmentResponse>(`/segs/${id}`, data, {
    signal,
  });

  return res.data;
};

