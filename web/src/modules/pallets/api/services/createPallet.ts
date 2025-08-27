import { apiClient } from "@/lib/apiClient";
import type { CreatePalletDto, PalletResponse } from "../types";

export const createPallet = async (
  data: CreatePalletDto,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.post<PalletResponse>("/pallets", data, {
    signal,
  });
  return res.data;
};
