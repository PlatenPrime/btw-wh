import { apiClient } from "@/lib/apiClient";
import type { SkuKonksPieResponseDto } from "@/modules/sku-analytics/api/types";

export const getSkuKonksPieData = async (
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuKonksPieResponseDto> => {
  const params = new URLSearchParams({ prod, dateFrom, dateTo });
  const res = await apiClient.get<SkuKonksPieResponseDto>(
    `sku-chart-reports/prod/konks-pie?${params.toString()}`,
    { signal },
  );

  return res.data;
};
