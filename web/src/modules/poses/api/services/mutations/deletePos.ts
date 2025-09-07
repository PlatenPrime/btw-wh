import { apiClient } from "@/lib/apiClient";

export const deletePos = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/poses/${id}`, {
    signal,
  });
  return res.data;
}; 