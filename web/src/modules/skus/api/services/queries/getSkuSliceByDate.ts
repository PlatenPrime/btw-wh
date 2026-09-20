import { apiClient } from "@/lib/apiClient";
import type { SkuSlicePointResponseDto } from "@/modules/skus/api/types";

export const getSkuSliceByDate = async (
  skuId: string,
  date: string,
  signal?: AbortSignal,
): Promise<SkuSlicePointResponseDto> => {
  const params = new URLSearchParams({ date });
  const res = await apiClient.get<SkuSlicePointResponseDto>(
    `sku-slices/sku/${skuId}?${params.toString()}`,
    { signal },
  );
  return res.data;
};
