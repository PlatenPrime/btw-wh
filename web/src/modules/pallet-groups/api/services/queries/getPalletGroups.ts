import { apiClient } from "@/lib/apiClient";
import type { PalletGroupsResponseDto } from "@/modules/pallet-groups/api/types";

export const getPalletGroups = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<PalletGroupsResponseDto> => {
  const res = await apiClient.get<PalletGroupsResponseDto>("/pallet-groups", {
    signal,
  });

  return res.data;
};
