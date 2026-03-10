import { apiClient } from "@/lib/apiClient";
import type { DeleteKaskResponse } from "@/modules/kasks/api/types/dto";

export const deleteKask = async (id: string): Promise<DeleteKaskResponse> => {
  const res = await apiClient.delete<DeleteKaskResponse>(`/kasks/${id}`);
  return res.data;
};
