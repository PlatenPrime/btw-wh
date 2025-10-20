import { apiClient } from "@/lib/apiClient";
import type { PosResponse } from "@/modules/poses/api/types";

export const getPosById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.get<PosResponse>(`/poses/${id}`, { signal });
  return res.data;
};
