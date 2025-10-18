import type { AxiosInstance } from "axios";

export const createDeletePalletService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    signal?: AbortSignal
  ): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/pallets/${id}`, {
      signal,
    });
    return res.data;
  };
};
