import { apiClient } from "@/lib/apiClient";
import type { IPos } from "@/modules/poses/api/types";

export interface GetPosesByPalletIdParams {
  sortBy?: "artikul" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const getPosesByPalletId = async (
  palletId: string,
  params?: GetPosesByPalletIdParams,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const { sortBy = "createdAt", sortOrder = "desc" } = params || {};
  
  const res = await apiClient.get<IPos[]>(`/poses/by-pallet/${palletId}`, {
    params: {
      sortBy,
      sortOrder,
    },
    signal,
  });
  return res.data;
};
