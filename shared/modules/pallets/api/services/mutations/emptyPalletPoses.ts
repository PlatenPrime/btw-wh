import type { AxiosInstance } from "axios";

export const createEmptyPalletPosesService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    signal?: AbortSignal
  ): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(
      `/pallets/${id}/empty-poses`,
      { signal }
    );
    return res.data;
  };
};
