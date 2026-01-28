import { apiClient } from "@/lib/apiClient";
import type { PalletGroupResponseDto } from "@/modules/pallet-groups/api/types";

export const getPalletGroup = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<PalletGroupResponseDto> => {
  const res = await apiClient.get<PalletGroupResponseDto>(
    `/pallet-groups/${id}`,
    { signal },
  );

  return res.data;
};
