import type { AxiosInstance } from "axios";
import type { DeleteRowResponse } from "../../types/dto";

export const createDeleteRowService = (apiClient: AxiosInstance) => {
  return async (
    rowId: string,
    signal?: AbortSignal
  ): Promise<DeleteRowResponse> => {
    const res = await apiClient.delete<DeleteRowResponse>(`/rows/${rowId}`, {
      signal,
    });
    return res.data;
  };
};
