import { apiClient } from "@/lib/apiClient";
import type { KonksListResponse } from "@/modules/konks/api/types";

export const getKonks = async (signal?: AbortSignal): Promise<KonksListResponse> => {
  const res = await apiClient.get<KonksListResponse>("/konks", { signal });
  return res.data;
};
