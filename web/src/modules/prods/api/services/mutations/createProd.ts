import { apiClient } from "@/lib/apiClient";
import type { CreateProdDto, ProdResponse } from "@/modules/prods/api/types";

export const createProd = async (data: CreateProdDto): Promise<ProdResponse> => {
  const res = await apiClient.post<ProdResponse>("/prods", data);
  return res.data;
};
