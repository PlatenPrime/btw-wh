import { apiClient } from "@/lib/apiClient";
import type { GetAskPullByIdResponse } from "@/modules/asks/api/types/dto";

export const getAskPull = async (id: string): Promise<GetAskPullByIdResponse> => {
  const res = await apiClient.get<GetAskPullByIdResponse>(`/asks/${id}/pull`);
  return res.data;
};

