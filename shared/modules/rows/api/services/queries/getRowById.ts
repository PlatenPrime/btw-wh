import type { AxiosInstance } from "axios";
import type { RowDto } from "../../types/dto";

export const createGetRowByIdService = (apiClient: AxiosInstance) => {
  return async (rowId: string, signal?: AbortSignal): Promise<RowDto> => {
    const res = await apiClient.get<RowDto>(`/rows/id/${rowId}`, {
      signal,
    });
    return res.data;
  };
};
