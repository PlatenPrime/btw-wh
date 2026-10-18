import { apiClient } from "@/lib/apiClient";
import type {
  SetPalletGroupDto,
  SetPalletGroupResponse,
} from "@/modules/pallets/api/types";

export const setPalletGroup = async (
  palletId: string,
  data: SetPalletGroupDto,
  signal?: AbortSignal,
): Promise<SetPalletGroupResponse> => {
  const res = await apiClient.patch<SetPalletGroupResponse>(
    `/pallets/${palletId}/pallet-group`,
    data,
    { signal },
  );
  return res.data;
};
