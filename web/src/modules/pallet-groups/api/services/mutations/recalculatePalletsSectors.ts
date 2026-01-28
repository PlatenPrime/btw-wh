import { apiClient } from "@/lib/apiClient";
import type { RecalculatePalletsSectorsResponseDto } from "@/modules/pallet-groups/api/types";

export const recalculatePalletsSectors = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<RecalculatePalletsSectorsResponseDto> => {
  const res = await apiClient.post<RecalculatePalletsSectorsResponseDto>(
    "/pallet-groups/recalculate-pallets-sectors",
    {},
    {
      signal,
      timeout: 60000,
    },
  );

  return res.data;
};
