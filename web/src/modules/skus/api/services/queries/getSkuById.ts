import { apiClient } from "@/lib/apiClient";
import type { SkuByIdResponseDto } from "@/modules/skus/api/types";

export const getSkuById = async (
  id: string,
  signal?: AbortSignal,
): Promise<SkuByIdResponseDto> => {
  const res = await apiClient.get<SkuByIdResponseDto>(`/skus/id/${id}`, {
    signal,
  });
  return res.data;
};
