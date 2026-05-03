import { apiClient } from "@/lib/apiClient";
import type { ClearSkugrSkusResponseDto } from "@/modules/skugrs/api/types";

export const clearSkugrSkus = async (
  id: string,
  signal?: AbortSignal,
): Promise<ClearSkugrSkusResponseDto> => {
  const res = await apiClient.post<ClearSkugrSkusResponseDto>(
    `skugrs/id/${id}/clear-skus`,
    {},
    { signal },
  );
  return res.data;
};
