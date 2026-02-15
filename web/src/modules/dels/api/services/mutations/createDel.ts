import { apiClient } from "@/lib/apiClient";
import type { CreateDelDto, DelResponse } from "@/modules/dels/api/types";

export const createDel = async (data: CreateDelDto): Promise<DelResponse> => {
  const res = await apiClient.post<DelResponse>("/dels", data);
  return res.data;
};
