import { apiClient } from "@/lib/apiClient";
import type { PalletListResponse } from "../types";

export const getEmptyPallets = async (
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const res = await apiClient.get<PalletListResponse>("/pallets/empty", { signal });
  return res.data;
};
