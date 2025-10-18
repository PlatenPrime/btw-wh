import type { AxiosInstance } from "axios";
import type { RowDto } from "../../types/dto";

export const createGetRowByTitleService = (apiClient: AxiosInstance) => {
  return async (rowTitle: string, signal?: AbortSignal): Promise<RowDto> => {
    const res = await apiClient.get<RowDto>(
      `/rows/title/${encodeURIComponent(rowTitle)}`,
      {
        signal,
      }
    );
    return res.data;
  };
};
