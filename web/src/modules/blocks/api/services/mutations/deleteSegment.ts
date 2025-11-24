import { apiClient } from "@/lib/apiClient";
import type { DeleteSegmentResponse } from "@/modules/blocks/api/types";

export const deleteSegment = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<DeleteSegmentResponse> => {
  const res = await apiClient.delete<DeleteSegmentResponse>(`/segs/${id}`, {
    signal,
  });

  return res.data;
};

