import { apiClient } from "@/lib/apiClient";
import type { SkuKonkProdSkugrGroupsSalesResponseDto } from "@/modules/sku-analytics/api/types";

export const getSkuKonkProdSkugrGroupsSalesData = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuKonkProdSkugrGroupsSalesResponseDto> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<SkuKonkProdSkugrGroupsSalesResponseDto>(
    `sku-sales-reports/konk-prod/skugr-groups-sales?${params.toString()}`,
    { signal },
  );
  return res.data;
};
