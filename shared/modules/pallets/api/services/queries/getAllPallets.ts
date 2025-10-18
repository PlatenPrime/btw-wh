import type { AxiosInstance } from "axios";
import type { PalletListResponse } from "../../types";

export const createGetAllPalletsService = (apiClient: AxiosInstance) => {
  return async (signal?: AbortSignal): Promise<PalletListResponse> => {
    const res = await apiClient.get<PalletListResponse>("/pallets", { signal });
    return res.data;
  };
};
