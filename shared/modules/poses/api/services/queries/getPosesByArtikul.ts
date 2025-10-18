import type { AxiosInstance } from "axios";
import type { GetPosesByArtikulResponse } from "../../types";

interface ApiResponse {
  success: boolean;
  data: GetPosesByArtikulResponse;
}

export const createGetPosesByArtikulService = (apiClient: AxiosInstance) => {
  return async (
    artikul: string,
    signal?: AbortSignal
  ): Promise<GetPosesByArtikulResponse> => {
    const res = await apiClient.get<ApiResponse>(
      `/poses/by-artikul/${artikul}`,
      {
        signal,
      }
    );
    return res.data.data;
  };
};
