import { apiClient } from "@/lib/apiClient";
import type { CreatePosDto, PosResponse } from "@/modules/poses/api/types";

export const createPos = async (
  data: CreatePosDto,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.post<PosResponse>("/poses", data, { signal });
  return res.data;
};
