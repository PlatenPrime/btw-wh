import { apiClient } from "@/lib/apiClient";
import type {
  SkuStockBandResponse,
  UpdateSkuStockBandDto,
} from "@/modules/sku-stock-bands/api/types";

export const updateSkuStockBand = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateSkuStockBandDto;
}): Promise<SkuStockBandResponse> => {
  const res = await apiClient.patch<SkuStockBandResponse>(
    `/sku-stock-bands/${id}`,
    data,
  );
  return res.data;
};
