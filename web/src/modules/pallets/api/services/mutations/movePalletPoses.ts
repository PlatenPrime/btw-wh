import { apiClient } from "@/lib/apiClient";
import type { IPallet } from "@/modules/pallets/api/types";

export const movePalletPoses = async (
  sourcePalletId: string,
  targetPalletId: string,
  signal?: AbortSignal,
): Promise<{ message: string; targetPallet?: IPallet }> => {
  const res = await apiClient.post<{ message: string; targetPallet?: IPallet }>(
    "/pallets/move-poses",
    { sourcePalletId, targetPalletId },
    { signal },
  );
  return res.data;
};
