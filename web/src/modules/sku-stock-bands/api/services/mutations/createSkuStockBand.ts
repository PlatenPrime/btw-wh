import { apiClient } from "@/lib/apiClient";
import type {
  CreateSkuStockBandDto,
  SkuStockBandResponse,
} from "@/modules/sku-stock-bands/api/types";

export const createSkuStockBand = async (
  data: CreateSkuStockBandDto,
): Promise<SkuStockBandResponse> => {
  const res = await apiClient.post<SkuStockBandResponse>(
    "/sku-stock-bands",
    data,
  );
  return res.data;
};
