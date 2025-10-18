import type { AxiosInstance } from "axios";
import type { PalletResponse } from "../../types";

export const createGetPalletByIdService = (apiClient: AxiosInstance) => {
  return async (id: string, signal?: AbortSignal): Promise<PalletResponse> => {
    const res = await apiClient.get<PalletResponse>(`/pallets/${id}`, {
      signal,
    });
    return res.data;
  };
};
