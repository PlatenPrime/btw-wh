import { apiClient } from "@/lib/apiClient";
import type { SkugrDailySummaryResponseDto } from "@/modules/skugrs/api/types";

export const getSkugrDailySummary = async (
  skugrId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkugrDailySummaryResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<SkugrDailySummaryResponseDto>(
    `sku-slices/skugr/${skugrId}/daily-summary?${params.toString()}`,
    { signal },
  );
  return res.data;
};
