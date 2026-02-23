import { apiClient } from "@/lib/apiClient";
import type { DeleteKonkResponse } from "@/modules/konks/api/types";

export const deleteKonk = async (id: string): Promise<DeleteKonkResponse> => {
  const res = await apiClient.delete<DeleteKonkResponse>(`/konks/id/${id}`);
  return res.data;
};
