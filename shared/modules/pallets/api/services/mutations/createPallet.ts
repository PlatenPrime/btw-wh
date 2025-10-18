import type { AxiosInstance } from "axios";
import type { CreatePalletDto, PalletResponse } from "../../types";

export const createCreatePalletService = (apiClient: AxiosInstance) => {
  return async (
    data: CreatePalletDto,
    signal?: AbortSignal
  ): Promise<PalletResponse> => {
    const res = await apiClient.post<PalletResponse>("/pallets", data, {
      signal,
    });
    return res.data;
  };
};
