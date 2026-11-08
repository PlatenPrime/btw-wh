import { apiClient } from "@/lib/apiClient";
import type { DeleteSkuStockBandResponse } from "@/modules/sku-stock-bands/api/types";

export const deleteSkuStockBand = async (
  id: string,
): Promise<DeleteSkuStockBandResponse> => {
  const res = await apiClient.delete<DeleteSkuStockBandResponse>(
    `/sku-stock-bands/${id}`,
  );
  return res.data;
};
