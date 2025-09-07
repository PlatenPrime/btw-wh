import { apiClient } from "@/lib/apiClient";
import type { PalletResponse } from "@/modules/pallets/api/types";

export const getPalletById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.get<PalletResponse>(`/pallets/${id}`, { signal });
  return res.data;
};
