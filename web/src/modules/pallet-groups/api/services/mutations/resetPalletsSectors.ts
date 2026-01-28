import { apiClient } from "@/lib/apiClient";
import type { ResetPalletsSectorsResponseDto } from "@/modules/pallet-groups/api/types";

export const resetPalletsSectors = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<ResetPalletsSectorsResponseDto> => {
  const res = await apiClient.post<ResetPalletsSectorsResponseDto>(
    "/pallet-groups/reset-pallets-sectors",
    {},
    { signal },
  );

  return res.data;
};
