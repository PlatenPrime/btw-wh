import type { AxiosInstance } from "axios";
import type { PalletResponse, UpdatePalletDto } from "../../types";

export const createUpdatePalletService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    data: UpdatePalletDto,
    signal?: AbortSignal
  ): Promise<PalletResponse> => {
    const res = await apiClient.put<PalletResponse>(`/pallets/${id}`, data, {
      signal,
    });
    return res.data;
  };
};
