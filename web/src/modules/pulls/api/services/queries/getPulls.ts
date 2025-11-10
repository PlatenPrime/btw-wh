import { apiClient } from "@/lib/apiClient";
import type { PullsResponse } from "@/modules/pulls/api/types";

interface GetPullsParams {
  signal?: AbortSignal;
}

export const getPulls = async ({ signal }: GetPullsParams = {}): Promise<PullsResponse> => {
  const res = await apiClient.get<PullsResponse>("/pulls", { signal });

  return res.data;
};