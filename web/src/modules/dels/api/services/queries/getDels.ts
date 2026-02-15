import { apiClient } from "@/lib/apiClient";
import type { DelsListResponse } from "@/modules/dels/api/types";

export const getDels = async (signal?: AbortSignal): Promise<DelsListResponse> => {
  const res = await apiClient.get<DelsListResponse>("/dels", { signal });
  return res.data;
};
