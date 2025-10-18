import type { AxiosInstance } from "axios";
import type { GetLatestDefsResponse } from "../../types/dto";

export const createGetLatestDefsService = (apiClient: AxiosInstance) => {
  return async (): Promise<GetLatestDefsResponse> => {
    const res = await apiClient.get<GetLatestDefsResponse>("/defs/latest");
    return res.data;
  };
};
