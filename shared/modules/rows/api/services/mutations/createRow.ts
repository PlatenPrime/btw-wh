import type { AxiosInstance } from "axios";
import type { CreateRowDto, RowDto } from "../../types/dto";

export const createCreateRowService = (apiClient: AxiosInstance) => {
  return async (data: CreateRowDto, signal?: AbortSignal): Promise<RowDto> => {
    const res = await apiClient.post<RowDto>("/rows", data, {
      signal,
    });
    return res.data;
  };
};
