import { apiClient } from "@/lib/apiClient";
import type { SkuSkugrSkusSalesResponseDto } from "@/modules/sku-analytics/api/types";

export const getSkuSkugrSkusSalesData = async (
  skugrId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuSkugrSkusSalesResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<SkuSkugrSkusSalesResponseDto>(
    `sku-sales-reports/skugr/${encodeURIComponent(skugrId)}/skus-sales?${params.toString()}`,
    { signal },
  );
  return res.data;
};
