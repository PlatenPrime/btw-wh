import { apiClient } from "@/lib/apiClient";
import type { GetKaskByIdResponse } from "@/modules/kasks/api/types/dto";

export const getKaskById = async (id: string): Promise<GetKaskByIdResponse> => {
  const res = await apiClient.get<GetKaskByIdResponse>(`/kasks/${id}`);
  return res.data;
};
