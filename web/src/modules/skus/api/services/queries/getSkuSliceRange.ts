import { apiClient } from "@/lib/apiClient";
import type { SkuSliceRangeResponseDto } from "@/modules/skus/api/types";

export const getSkuSliceRange = async (
  skuId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuSliceRangeResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<SkuSliceRangeResponseDto>(
    `sku-slices/sku/${skuId}/range?${params.toString()}`,
    { signal },
  );
  return res.data;
};
