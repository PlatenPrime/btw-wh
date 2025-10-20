import { apiClient } from "@/lib/apiClient";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";

export const getLatestDefs = async (): Promise<GetLatestDefsResponse> => {
  const res = await apiClient.get<GetLatestDefsResponse>("/defs/latest");
  return res.data;
};
