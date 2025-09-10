import { apiClient } from "@/lib/apiClient";
import type { GetAskByIdResponse } from "@/modules/asks/api/types/dto";

export const getAskById = async (id: string): Promise<GetAskByIdResponse> => {
  const res = await apiClient.get<GetAskByIdResponse>(`/asks/${id}`);
  return res.data;
};
