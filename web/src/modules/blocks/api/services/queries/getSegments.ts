import { apiClient } from "@/lib/apiClient";
import type { SegmentsResponseDto } from "@/modules/blocks/api/types";

export const getSegments = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<SegmentsResponseDto> => {
  const res = await apiClient.get<SegmentsResponseDto>("/segs", {
    signal,
  });

  return res.data;
};

