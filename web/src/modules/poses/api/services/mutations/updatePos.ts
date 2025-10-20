import { apiClient } from "@/lib/apiClient";
import type { PosResponse, UpdatePosDto } from "@/modules/poses/api/types";

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
