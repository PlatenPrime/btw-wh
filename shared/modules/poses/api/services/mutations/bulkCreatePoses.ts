import type { AxiosInstance } from "axios";
import type { BulkCreatePosDto, IPos } from "../../types";

export const createBulkCreatePosesService = (apiClient: AxiosInstance) => {
  return async (
    data: BulkCreatePosDto,
    signal?: AbortSignal
  ): Promise<{ message: string; data: IPos[] }> => {
    const res = await apiClient.post<{ message: string; data: IPos[] }>(
      "/poses/bulk",
      data,
      { signal }
    );
    return res.data;
  };
};
