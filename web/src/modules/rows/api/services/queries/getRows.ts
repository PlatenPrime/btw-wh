import { apiClient } from "@/lib/apiClient";
import type { RowDto } from "@/modules/rows/api/types/dto";

export const getRows = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<RowDto[]> => {
  const res = await apiClient.get<RowDto[]>("/rows", {
    signal,
  });

  return res.data;
};
