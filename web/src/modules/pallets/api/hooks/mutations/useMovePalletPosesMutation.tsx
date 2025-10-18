import { movePalletPoses } from "@/modules/pallets/api/services";
import type { IPallet } from "@/modules/pallets/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseMovePalletPosesMutationArgs {
  pallet: IPallet;
}

export function useMovePalletPosesMutation({
  pallet,
}: UseMovePalletPosesMutationArgs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetPalletId: string) =>
      movePalletPoses(pallet._id, targetPalletId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pallet", { title: pallet.title }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { title: pallet.rowData.title }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallets", { option: "empty" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId: pallet._id }],
      });
    },
  });
}
