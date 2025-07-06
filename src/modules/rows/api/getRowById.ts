import { apiClient } from "@/lib/apiClient";
import type { RowDto } from "../types/dto";

export const getRowById = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<RowDto> => {
  const res = await apiClient.get<RowDto>(`/rows/id/${rowId}`, {
    signal,
  });
  return res.data;
};
