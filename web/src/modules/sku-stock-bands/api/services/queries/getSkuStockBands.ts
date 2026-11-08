import { apiClient } from "@/lib/apiClient";
import type {
  GetSkuStockBandsParams,
  SkuStockBandsListResponse,
} from "@/modules/sku-stock-bands/api/types";

export const getSkuStockBands = async ({
  konkName,
  signal,
}: GetSkuStockBandsParams = {}): Promise<SkuStockBandsListResponse> => {
  const res = await apiClient.get<SkuStockBandsListResponse>(
    "/sku-stock-bands",
    {
      params: konkName ? { konkName } : undefined,
      signal,
    },
  );
  return res.data;
};
