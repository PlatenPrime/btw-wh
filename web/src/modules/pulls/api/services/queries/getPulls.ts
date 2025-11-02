import { apiClient } from "@/lib/apiClient";
import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";

export interface GetPullsParams {
  signal?: AbortSignal;
}

export const getPulls = async ({
  signal,
}: GetPullsParams = {}): Promise<GetPullsResponse> => {
  const res = await apiClient.get<GetPullsResponse>("/pulls", {
    signal,
  });

  return res.data;
};

