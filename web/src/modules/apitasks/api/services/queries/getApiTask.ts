import { apiClient } from "@/lib/apiClient";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import type { MutationResponse } from "@/types/api";

export async function getApiTask(taskId: string): Promise<ApiTaskDto> {
  const res = await apiClient.get<MutationResponse<ApiTaskDto>>(
    `apitasks/${encodeURIComponent(taskId)}`,
  );
  return res.data.data;
}
