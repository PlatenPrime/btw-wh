import { deletePalletEmptyPoses } from "@/modules/pallets/api/services/mutations/deletePalletEmptyPoses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePalletEmptyPosesMutation({
  palletId,
  palletTitle,
  rowTitle,
}: {
  palletId: string;
  palletTitle: string;
  rowTitle?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePalletEmptyPoses(palletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { title: palletTitle }],
      });
      if (rowTitle) {
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle }],
        });
      }
    },
  });
}
