import type { AxiosInstance } from "axios";
import type { PosResponse, UpdatePosDto } from "../../types";

export const createUpdatePosService = (apiClient: AxiosInstance) => {
  return async (
    id: string,
    data: UpdatePosDto,
    signal?: AbortSignal
  ): Promise<PosResponse> => {
    const res = await apiClient.put<PosResponse>(`/poses/${id}`, data, {
      signal,
    });
    return res.data;
  };
};
