import { apiClient } from "@/lib/apiClient";
import type {
  PalletGroupResponseDto,
  SetPalletsForGroupDto,
} from "@/modules/pallet-groups/api/types";

export const setPalletsForGroup = async ({
  data,
  signal,
}: {
  data: SetPalletsForGroupDto;
  signal?: AbortSignal;
}): Promise<PalletGroupResponseDto> => {
  const res = await apiClient.post<PalletGroupResponseDto>(
    "/pallet-groups/set-pallets",
    data,
    { signal },
  );

  return res.data;
};
