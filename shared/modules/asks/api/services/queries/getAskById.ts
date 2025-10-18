import type { AxiosInstance } from "axios";
import type { GetAskByIdResponse } from "../../types/dto";

export const createGetAskByIdService = (apiClient: AxiosInstance) => {
  return async (id: string): Promise<GetAskByIdResponse> => {
    const res = await apiClient.get<GetAskByIdResponse>(`/asks/${id}`);
    return res.data;
  };
};
