import { apiClient } from "@/lib/apiClient";
import type { SegmentsResponseDto } from "@/modules/blocks/api/types";

export const getSegmentsByBlock = async ({
  blockId,
  signal,
}: {
  blockId: string;
  signal?: AbortSignal;
}): Promise<SegmentsResponseDto> => {
  const res = await apiClient.get<SegmentsResponseDto>(`/segs/by-block/${blockId}`, {
    signal,
  });

  return res.data;
};

