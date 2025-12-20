import { getPosesByPalletId, type GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { useQuery } from "@tanstack/react-query";
import type { IPos } from "@/modules/poses/api/types";

export function usePosesByPalletQuery(
  palletId: string,
  params?: GetPosesByPalletIdParams,
) {
  return useQuery<IPos[]>({
    queryKey: ["poses", { by: "pallet", palletId, ...params }],
    queryFn: ({ signal }) => getPosesByPalletId(palletId, params, signal),
    enabled: !!palletId,
    staleTime: 5 * 60 * 1000,
  });
}

