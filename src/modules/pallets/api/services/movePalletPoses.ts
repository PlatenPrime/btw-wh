import { apiClient } from "@/lib/apiClient";

export const movePalletPoses = async (
  fromPalletId: string,
  toPalletId: string,
  positionIds: string[],
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.post<{ message: string }>(
    "/pallets/move-poses",
    { fromPalletId, toPalletId, positionIds },
    { signal },
  );
  return res.data;
};
