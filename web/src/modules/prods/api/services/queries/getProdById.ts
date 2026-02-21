import { apiClient } from "@/lib/apiClient";
import type { ProdResponse } from "@/modules/prods/api/types";

export const getProdById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<ProdResponse> => {
  const res = await apiClient.get<ProdResponse>(`/prods/id/${id}`, { signal });
  return res.data;
};
