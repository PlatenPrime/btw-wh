import type { AxiosInstance } from "axios";
import type { PalletListResponse } from "../../types";

export const createGetEmptyPalletsService = (apiClient: AxiosInstance) => {
  return async (signal?: AbortSignal): Promise<PalletListResponse> => {
    const res = await apiClient.get<PalletListResponse>("/pallets/empty", {
      signal,
    });
    return res.data;
  };
};
