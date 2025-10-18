import type { AxiosInstance } from "axios";
import type { IPos } from "../../types";

export const createGetPosesByRowIdService = (apiClient: AxiosInstance) => {
  return async (rowId: string, signal?: AbortSignal): Promise<IPos[]> => {
    const res = await apiClient.get<IPos[]>(`/poses/by-row/${rowId}`, {
      signal,
    });
    return res.data;
  };
};
