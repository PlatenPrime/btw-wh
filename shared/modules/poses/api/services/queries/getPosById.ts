import type { AxiosInstance } from "axios";
import type { PosResponse } from "../../types";

export const createGetPosByIdService = (apiClient: AxiosInstance) => {
  return async (id: string, signal?: AbortSignal): Promise<PosResponse> => {
    const res = await apiClient.get<PosResponse>(`/poses/${id}`, { signal });
    return res.data;
  };
};
