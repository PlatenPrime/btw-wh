import { apiClient } from "@/lib/apiClient";
import type {
  BulkSegmentsUpsertResponse,
  BulkUpsertSegmentPayload,
} from "@/modules/blocks/api/types";

export const bulkUpsertSegments = async (
  payload: BulkUpsertSegmentPayload[],
  signal?: AbortSignal
): Promise<BulkSegmentsUpsertResponse> => {
  const res = await apiClient.post<BulkSegmentsUpsertResponse>(
    "/segs/upsert",
    payload,
    { signal }
  );

  return res.data;
};


