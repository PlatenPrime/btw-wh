import { getPosesByPalletId, type GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { useQuery } from "@tanstack/react-query";

export function usePosesByPalletQuery(
  palletId: string,
  params?: GetPosesByPalletIdParams,
) {
  return useQuery({
    queryKey: ["poses", { by: "pallet", palletId, ...params }],
    queryFn: ({ signal }) => getPosesByPalletId(palletId, params, signal),
    enabled: !!palletId,
  });
}
