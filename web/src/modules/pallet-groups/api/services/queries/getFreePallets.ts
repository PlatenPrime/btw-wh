import { apiClient } from "@/lib/apiClient";
import type { FreePalletsResponseDto } from "@/modules/pallet-groups/api/types";

export const getFreePallets = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<FreePalletsResponseDto> => {
  const res = await apiClient.get<FreePalletsResponseDto>(
    "/pallet-groups/free-pallets",
    { signal },
  );

  return res.data;
};
