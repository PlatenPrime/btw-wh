import { apiClient } from "@/lib/apiClient";
import type { PalletResponse } from "@/modules/pallets/api/types";

export const getPalletByTitle = async (
  title: string,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.get<PalletResponse>(`/pallets/by-title/${title}`, { signal });
  return res.data;
};