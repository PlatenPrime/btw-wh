import { apiClient } from "@/lib/apiClient";
import type { SkuStockBandResponse } from "@/modules/sku-stock-bands/api/types";

export const getSkuStockBandById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<SkuStockBandResponse> => {
  const res = await apiClient.get<SkuStockBandResponse>(
    `/sku-stock-bands/${id}`,
    { signal },
  );
  return res.data;
};
