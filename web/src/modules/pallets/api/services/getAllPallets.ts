import { apiClient } from "@/lib/apiClient";
import type { PalletListResponse } from "../types";

export const getAllPallets = async (
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const res = await apiClient.get<PalletListResponse>("/pallets", { signal });
  return res.data;
};
