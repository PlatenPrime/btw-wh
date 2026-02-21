import { apiClient } from "@/lib/apiClient";
import type { ProdsListResponse } from "@/modules/prods/api/types";

export const getProds = async (signal?: AbortSignal): Promise<ProdsListResponse> => {
  const res = await apiClient.get<ProdsListResponse>("/prods", { signal });
  return res.data;
};
