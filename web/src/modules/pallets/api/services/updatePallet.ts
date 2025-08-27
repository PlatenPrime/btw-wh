import { apiClient } from "@/lib/apiClient";
import type { PalletResponse, UpdatePalletDto } from "../types";

export const updatePallet = async (
  id: string,
  data: UpdatePalletDto,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.put<PalletResponse>(`/pallets/${id}`, data, {
    signal,
  });
  return res.data;
};
