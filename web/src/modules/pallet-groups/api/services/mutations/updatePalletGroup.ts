import { apiClient } from "@/lib/apiClient";
import type {
  PalletGroupResponseDto,
  UpdatePalletGroupDto,
} from "@/modules/pallet-groups/api/types";

export const updatePalletGroup = async ({
  id,
  data,
  signal,
}: {
  id: string;
  data: UpdatePalletGroupDto;
  signal?: AbortSignal;
}): Promise<PalletGroupResponseDto> => {
  const res = await apiClient.put<PalletGroupResponseDto>(
    `/pallet-groups/${id}`,
    data,
    { signal },
  );

  return res.data;
};
