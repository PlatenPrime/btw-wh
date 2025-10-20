import { apiClient } from "@/lib/apiClient";
import type { CreateRowDto, RowDto } from "@/modules/rows/api/types/dto";

export const createRow = async (
  data: CreateRowDto,
  signal?: AbortSignal,
): Promise<RowDto> => {
  const res = await apiClient.post<RowDto>("/rows", data, {
    signal,
  });
  return res.data;
};
