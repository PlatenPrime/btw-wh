import { apiClient } from "@/lib/apiClient";
import type { DeleteDelResponse } from "@/modules/dels/api/types";

export const deleteDel = async (
  delId: string,
  signal?: AbortSignal,
): Promise<DeleteDelResponse> => {
  const res = await apiClient.delete<DeleteDelResponse>(`/dels/id/${delId}`, {
    signal,
  });
  return res.data;
};
