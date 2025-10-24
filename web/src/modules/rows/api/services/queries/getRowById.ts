import { apiClient } from "@/lib/apiClient";
import type { RowResponse } from "@/modules/rows/api/types/dto";

export const getRowById = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<RowResponse> => {
  const res = await apiClient.get<RowResponse>(`/rows/id/${rowId}`, {
    signal,
  });
  return res.data;
};
