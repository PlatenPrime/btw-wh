import { apiClient } from "@/lib/apiClient";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import type { MutationResponse } from "@/types/api";

export async function cancelApiTask(taskId: string): Promise<ApiTaskDto> {
  const res = await apiClient.delete<MutationResponse<ApiTaskDto>>(
    `apitasks/${encodeURIComponent(taskId)}`,
  );
  return res.data.data;
}
