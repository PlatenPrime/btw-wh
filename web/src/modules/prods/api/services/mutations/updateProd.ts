import { apiClient } from "@/lib/apiClient";
import type { ProdResponse, UpdateProdDto } from "@/modules/prods/api/types";

export const updateProd = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateProdDto;
}): Promise<ProdResponse> => {
  const res = await apiClient.patch<ProdResponse>(`/prods/id/${id}`, data);
  return res.data;
};
