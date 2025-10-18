import type { AxiosInstance } from "axios";
import type { GetAsksByDateResponse } from "../../types/dto";

export interface GetAsksByDateParams {
  date: string;
  signal?: AbortSignal;
}

export const createGetAsksByDateService = (apiClient: AxiosInstance) => {
  return async ({
    date,
    signal,
  }: GetAsksByDateParams): Promise<GetAsksByDateResponse> => {
    const query = new URLSearchParams({
      date,
    });

    const res = await apiClient.get<GetAsksByDateResponse>(
      `/asks/by-date?${query.toString()}`,
      {
        signal,
      }
    );

    return res.data;
  };
};
