import { apiClient } from "@/lib/apiClient";

export const movePalletPoses = async (
  sourcePalletId: string,
  targetPalletId: string,
  signal?: AbortSignal,
): Promise<{ message: string; targetPallet?: unknown }> => {
  const res = await apiClient.post<{ message: string; targetPallet?: unknown }>(
    "/pallets/move-poses",
    { sourcePalletId, targetPalletId },
    { signal },
  );
  return res.data;
};
