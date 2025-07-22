import { apiClient } from "@/lib/apiClient";
import type { DeleteRowResponse } from "../types/dto";

export const deleteRow = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<DeleteRowResponse> => {
  const res = await apiClient.delete<DeleteRowResponse>(`/rows/${rowId}`, {
    signal,
  });
  return res.data;
};
