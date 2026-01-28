import { apiClient } from "@/lib/apiClient";
import type {
  PalletGroupResponseDto,
  UnlinkPalletDto,
} from "@/modules/pallet-groups/api/types";

export const unlinkPallet = async ({
  data,
  signal,
}: {
  data: UnlinkPalletDto;
  signal?: AbortSignal;
}): Promise<PalletGroupResponseDto> => {
  const res = await apiClient.post<PalletGroupResponseDto>(
    "/pallet-groups/unlink-pallet",
    data,
    { signal },
  );

  return res.data;
};
