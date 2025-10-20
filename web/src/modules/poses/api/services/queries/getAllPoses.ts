import { apiClient } from "@/lib/apiClient";
import type { PosListResponse } from "@/modules/poses/api/types";

export const getAllPoses = async (
  params: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>,
  signal?: AbortSignal,
): Promise<PosListResponse> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.append(k, String(v));
  });
  const res = await apiClient.get<PosListResponse>(
    `/poses?${query.toString()}`,
    { signal },
  );
  return res.data;
};
