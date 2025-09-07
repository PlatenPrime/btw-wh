import { apiClient } from "@/lib/apiClient";

export const deletePallet = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/pallets/${id}`, {
    signal,
  });
  return res.data;
};
