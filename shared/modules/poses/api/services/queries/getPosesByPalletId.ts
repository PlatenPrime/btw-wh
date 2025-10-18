import type { AxiosInstance } from "axios";
import type { IPos } from "../../types";

export const createGetPosesByPalletIdService = (apiClient: AxiosInstance) => {
  return async (palletId: string, signal?: AbortSignal): Promise<IPos[]> => {
    const res = await apiClient.get<IPos[]>(`/poses/by-pallet/${palletId}`, {
      signal,
    });
    return res.data;
  };
};
