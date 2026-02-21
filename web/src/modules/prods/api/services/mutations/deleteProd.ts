import { apiClient } from "@/lib/apiClient";
import type { DeleteProdResponse } from "@/modules/prods/api/types";

export const deleteProd = async (id: string): Promise<DeleteProdResponse> => {
  const res = await apiClient.delete<DeleteProdResponse>(`/prods/id/${id}`);
  return res.data;
};
