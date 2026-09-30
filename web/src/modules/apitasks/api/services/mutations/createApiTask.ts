import { apiClient } from "@/lib/apiClient";
import type {
  CreateApiTaskBody,
  CreateApiTaskResult,
} from "@/modules/apitasks/api/types";
import type { MutationResponse } from "@/types/api";

export async function createApiTask(
  body: CreateApiTaskBody,
): Promise<CreateApiTaskResult> {
  const res = await apiClient.post<MutationResponse<CreateApiTaskResult>>(
    "apitasks",
    body,
  );
  return res.data.data;
}
