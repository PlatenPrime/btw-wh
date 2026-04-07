import { apiClient } from "@/lib/apiClient";
import type { SkuManufacturersPieResponseDto } from "@/modules/sku-slices/api/types";

export const getSkuManufacturersPieData = async (
  konk: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<SkuManufacturersPieResponseDto> => {
  const params = new URLSearchParams({ konk, dateFrom, dateTo });
  const res = await apiClient.get<SkuManufacturersPieResponseDto>(
    `sku-slices/konk-prod/manufacturers-pie-data?${params.toString()}`,
    { signal },
  );

  return res.data;
};
