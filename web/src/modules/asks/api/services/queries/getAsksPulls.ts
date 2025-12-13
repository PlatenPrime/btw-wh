import { apiClient } from "@/lib/apiClient";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";

export const getAsksPulls = async (): Promise<GetAsksPullsResponse> => {
  const res = await apiClient.get<GetAsksPullsResponse>("/asks/pulls");
  return res.data;
};

