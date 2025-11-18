import { apiClient } from "@/lib/apiClient";
import type { UpdateAllBtradeStocksResponse } from "@/modules/arts/api/types/dto";

export const updateAllBtradeStocks = async (): Promise<UpdateAllBtradeStocksResponse> => {
  const res = await apiClient.post<UpdateAllBtradeStocksResponse>(
    "/arts/btrade-stock/update-all",
  );
  return res.data;
};

