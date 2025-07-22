import { apiClient } from "@/lib/apiClient";
import type { RowDto, UpdateRowDto } from "../types/dto";

export const updateRow = async (
  rowId: string,
  data: UpdateRowDto,
  signal?: AbortSignal,
): Promise<RowDto> => {
  console.log("Making PUT request to:", `/rows/${rowId}`, "with data:", data);
  const res = await apiClient.put<RowDto>(`/rows/${rowId}`, data, {
    signal,
  });
  console.log("Update response:", res.data);
  return res.data;
};
