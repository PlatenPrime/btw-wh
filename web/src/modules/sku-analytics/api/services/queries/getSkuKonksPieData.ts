import { apiClient } from "@/lib/apiClient";
import type { SkuKonksPieResponseDto } from "@/modules/sku-analytics/api/types";
import { appendExcludeKonks } from "@/modules/sku-analytics/api/utils/appendExcludeKonks";

export interface GetSkuKonksPieDataParams {
  prod: string;
  dateFrom: string;
  dateTo: string;
  excludeKonks?: string[];
  signal?: AbortSignal;
}

export const getSkuKonksPieData = async ({
  prod,
  dateFrom,
  dateTo,
  excludeKonks,
  signal,
}: GetSkuKonksPieDataParams): Promise<SkuKonksPieResponseDto> => {
  const params = new URLSearchParams({ prod, dateFrom, dateTo });
  appendExcludeKonks(params, excludeKonks);

  const res = await apiClient.get<SkuKonksPieResponseDto>(
    `sku-chart-reports/prod/konks-pie?${params.toString()}`,
    { signal },
  );

  return res.data;
};
