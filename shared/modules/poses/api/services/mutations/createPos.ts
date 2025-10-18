import type { AxiosInstance } from "axios";
import type { CreatePosDto, PosResponse } from "../../types";

export const createCreatePosService = (apiClient: AxiosInstance) => {
  return async (
    data: CreatePosDto,
    signal?: AbortSignal
  ): Promise<PosResponse> => {
    const res = await apiClient.post<PosResponse>("/poses", data, { signal });
    return res.data;
  };
};
