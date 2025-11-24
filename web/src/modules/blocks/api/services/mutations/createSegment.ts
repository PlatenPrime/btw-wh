import { apiClient } from "@/lib/apiClient";
import type { SegmentResponse, CreateSegmentDto } from "@/modules/blocks/api/types";

export const createSegment = async ({
  data,
  signal,
}: {
  data: CreateSegmentDto;
  signal?: AbortSignal;
}): Promise<SegmentResponse> => {
  const res = await apiClient.post<SegmentResponse>("/segs", data, {
    signal,
  });

  return res.data;
};

