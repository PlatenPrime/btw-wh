import { apiClient } from "@/lib/apiClient";
import type {
  ApiTaskDto,
  ApiTaskStatus,
} from "@/modules/apitasks/api/types";
import type { MutationResponse } from "@/types/api";

export interface ListApiTasksParams {
  status?: ApiTaskStatus | ApiTaskStatus[] | string;
}

export async function listApiTasks(
  params?: ListApiTasksParams,
): Promise<ApiTaskDto[]> {
  const query: Record<string, string> = {};
  if (params?.status !== undefined) {
    query.status = Array.isArray(params.status)
      ? params.status.join(",")
      : params.status;
  }

  const res = await apiClient.get<MutationResponse<ApiTaskDto[]>>("apitasks", {
    params: query,
  });
  return res.data.data;
}
