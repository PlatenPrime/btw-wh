import { apiClient } from "@/lib/apiClient";
import type { ConstantsListResponse } from "@/modules/constants/api/types";

export const getConstants = async (
  signal?: AbortSignal,
): Promise<ConstantsListResponse> => {
  const res = await apiClient.get<ConstantsListResponse>("/constants", {
    signal,
  });
  return res.data;
};
