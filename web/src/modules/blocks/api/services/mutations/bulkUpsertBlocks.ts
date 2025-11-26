import { apiClient } from "@/lib/apiClient";
import type {
  BulkBlocksUpsertResponse,
  BulkUpsertBlockPayload,
} from "@/modules/blocks/api/types";

export const bulkUpsertBlocks = async (
  payload: BulkUpsertBlockPayload[],
  signal?: AbortSignal
): Promise<BulkBlocksUpsertResponse> => {
  const res = await apiClient.post<BulkBlocksUpsertResponse>(
    "/blocks/upsert",
    payload,
    { signal }
  );

  return res.data;
};


