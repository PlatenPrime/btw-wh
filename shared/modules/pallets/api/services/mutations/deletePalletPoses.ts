import type { AxiosInstance } from "axios";

export const createDeletePalletPosesService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    signal?: AbortSignal
  ): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(
      `/pallets/${id}/poses`,
      { signal }
    );
    return res.data;
  };
};
