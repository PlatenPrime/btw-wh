import { apiClient } from "@/lib/apiClient";
import type { UpdateBtradeStockResponse } from "@/modules/arts/api/types/dto";

export const updateBtradeStockByArtikul = async (
  artikul: string,
): Promise<UpdateBtradeStockResponse> => {
  const res = await apiClient.patch<UpdateBtradeStockResponse>(
    `/arts/${artikul}/btrade-stock`,
  );
  return res.data;
};

