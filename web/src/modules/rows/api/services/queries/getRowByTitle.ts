import { apiClient } from "@/lib/apiClient";
import type { RowResponse } from "@/modules/rows/api/types/dto";

export const getRowByTitle = async (
  rowTitle: string,
  signal?: AbortSignal,
): Promise<RowResponse> => {
  const res = await apiClient.get<RowResponse>(
    `/rows/title/${encodeURIComponent(rowTitle)}`,
    {
      signal,
    },
  );
  return res.data;
};
