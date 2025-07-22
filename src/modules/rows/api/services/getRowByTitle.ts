import { apiClient } from "@/lib/apiClient";
import type { RowDto } from "../types/dto";

export const getRowByTitle = async (
  rowTitle: string,
  signal?: AbortSignal,
): Promise<RowDto> => {
  const res = await apiClient.get<RowDto>(
    `/rows/title/${encodeURIComponent(rowTitle)}`,
    {
      signal,
    },
  );
  // pallets уже PalletShortDto[]
  return res.data;
};
