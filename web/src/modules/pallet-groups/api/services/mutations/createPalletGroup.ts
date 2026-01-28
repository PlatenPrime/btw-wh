import { apiClient } from "@/lib/apiClient";
import type {
  CreatePalletGroupDto,
  PalletGroupResponseDto,
} from "@/modules/pallet-groups/api/types";

export const createPalletGroup = async ({
  data,
  signal,
}: {
  data: CreatePalletGroupDto;
  signal?: AbortSignal;
}): Promise<PalletGroupResponseDto> => {
  const res = await apiClient.post<PalletGroupResponseDto>(
    "/pallet-groups",
    data,
    { signal },
  );

  return res.data;
};
