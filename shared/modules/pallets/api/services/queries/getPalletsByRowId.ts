import type { AxiosInstance } from "axios";
import type { PalletShortListResponse } from "../../types";

export const createGetPalletsByRowIdService = (apiClient: AxiosInstance) => {
  return async (
    rowId: string,
    signal?: AbortSignal
  ): Promise<PalletShortListResponse> => {
    const res = await apiClient.get<PalletShortListResponse>(
      `/pallets/by-row/${rowId}`,
      { signal }
    );
    return res.data;
  };
};
