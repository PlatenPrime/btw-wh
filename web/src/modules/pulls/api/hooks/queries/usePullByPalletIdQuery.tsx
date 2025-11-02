import { useQuery } from "@tanstack/react-query";
import type { GetPullByPalletIdResponse } from "@/modules/pulls/api/types/dto";
import { getPullByPalletId } from "@/modules/pulls/api/services/queries/getPullByPalletId";

export interface UsePullByPalletIdQueryParams {
  palletId: string;
  enabled?: boolean;
}

export function usePullByPalletIdQuery({
  palletId,
  enabled = true,
}: UsePullByPalletIdQueryParams) {
  return useQuery<GetPullByPalletIdResponse>({
    queryKey: ["pulls", palletId],
    queryFn: ({ signal }) =>
      getPullByPalletId({
        palletId,
        signal,
      }),
    enabled: enabled && !!palletId,
    staleTime: 5000, // 5 seconds
  });
}

