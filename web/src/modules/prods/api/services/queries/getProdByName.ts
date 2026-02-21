import { apiClient } from "@/lib/apiClient";
import type { ProdResponse } from "@/modules/prods/api/types";

export const getProdByName = async ({
  name,
  signal,
}: {
  name: string;
  signal?: AbortSignal;
}): Promise<ProdResponse> => {
  const res = await apiClient.get<ProdResponse>(`/prods/name/${encodeURIComponent(name)}`, { signal });
  return res.data;
};
