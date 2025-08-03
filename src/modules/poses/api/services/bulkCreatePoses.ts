import { apiClient } from "@/lib/apiClient";
import type { BulkCreatePosDto, IPos } from "../types/index";

export const bulkCreatePoses = async (
  data: BulkCreatePosDto,
  signal?: AbortSignal,
): Promise<{ message: string; data: IPos[] }> => {
  const res = await apiClient.post<{ message: string; data: IPos[] }>(
    "/poses/bulk",
    data,
    { signal },
  );
  return res.data;
};
