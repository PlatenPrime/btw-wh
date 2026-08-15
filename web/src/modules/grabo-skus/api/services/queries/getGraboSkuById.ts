import { apiClient } from "@/lib/apiClient";
import type { GraboSkuByIdResponseDto } from "@/modules/grabo-skus/api/types";

export const getGraboSkuById = async (
  id: string,
  signal?: AbortSignal,
): Promise<GraboSkuByIdResponseDto> => {
  const res = await apiClient.get<GraboSkuByIdResponseDto>(
    `/grabo-skus/id/${id}`,
    { signal },
  );
  return res.data;
};
