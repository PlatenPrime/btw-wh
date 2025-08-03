import { apiClient } from "@/lib/apiClient";
import type { PosResponse, UpdatePosDto } from "../types/index";

export const updatePos = async (
  id: string,
  data: UpdatePosDto,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.put<PosResponse>(`/poses/${id}`, data, {
    signal,
  });
  return res.data;
};
