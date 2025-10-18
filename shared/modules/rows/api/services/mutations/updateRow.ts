import type { AxiosInstance } from "axios";
import type { RowDto, UpdateRowDto } from "../../types/dto";

export const createUpdateRowService = (apiClient: AxiosInstance) => {
  return async (
    rowId: string,
    data: UpdateRowDto,
    signal?: AbortSignal
  ): Promise<RowDto> => {
    const res = await apiClient.put<RowDto>(`/rows/${rowId}`, data, {
      signal,
    });
    return res.data;
  };
};
