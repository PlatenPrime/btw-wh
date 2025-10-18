import type { AxiosInstance } from "axios";
import type { RowDto } from "../../types/dto";

export const createGetRowsService = (apiClient: AxiosInstance) => {
  return async ({ signal }: { signal?: AbortSignal }): Promise<RowDto[]> => {
    const res = await apiClient.get<RowDto[]>("/rows", {
      signal,
    });

    return res.data;
  };
};
