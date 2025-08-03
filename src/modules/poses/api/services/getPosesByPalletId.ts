import { apiClient } from "@/lib/apiClient";
import type { IPos } from "../types/index";

export const getPosesByPalletId = async (
  palletId: string,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const res = await apiClient.get<IPos[]>(`/poses/by-pallet/${palletId}`, {
    signal,
  });
  return res.data;
};
