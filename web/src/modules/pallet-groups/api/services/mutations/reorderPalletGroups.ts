import { apiClient } from "@/lib/apiClient";
import type {
  ReorderPalletGroupsDto,
  ReorderPalletGroupsResponseDto,
} from "@/modules/pallet-groups/api/types";

export const reorderPalletGroups = async ({
  orders,
  signal,
}: ReorderPalletGroupsDto & {
  signal?: AbortSignal;
}): Promise<ReorderPalletGroupsResponseDto> => {
  const res = await apiClient.patch<ReorderPalletGroupsResponseDto>(
    "/pallet-groups/reorder",
    { orders },
    { signal },
  );

  return res.data;
};
