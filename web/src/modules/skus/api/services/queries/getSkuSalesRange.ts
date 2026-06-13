import { apiClient } from "@/lib/apiClient";
import type { SkuSalesRangeResponseDto } from "@/modules/skus/api/types";

export const getSkuSalesRange = async (
  skuId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuSalesRangeResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<SkuSalesRangeResponseDto>(
    `sku-sales-reports/sku/${skuId}/range?${params.toString()}`,
    { signal },
  );
  return res.data;
};
