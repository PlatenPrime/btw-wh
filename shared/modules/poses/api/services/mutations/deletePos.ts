import type { AxiosInstance } from "axios";

export const createDeletePosService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    signal?: AbortSignal
  ): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/poses/${id}`, {
      signal,
    });
    return res.data;
  };
};
