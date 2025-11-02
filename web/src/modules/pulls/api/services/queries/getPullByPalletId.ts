import { apiClient } from "@/lib/apiClient";
import type { GetPullByPalletIdResponse } from "@/modules/pulls/api/types/dto";

export interface GetPullByPalletIdParams {
  palletId: string;
  signal?: AbortSignal;
}

export const getPullByPalletId = async ({
  palletId,
  signal,
}: GetPullByPalletIdParams): Promise<GetPullByPalletIdResponse> => {
  const res = await apiClient.get<GetPullByPalletIdResponse>(
    `/pulls/${palletId}`,
    {
      signal,
    },
  );

  return res.data;
};

