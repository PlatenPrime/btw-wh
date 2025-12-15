import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePalletPoses } from "@/modules/pallets/api/services/mutations/deletePalletPoses";

export function useDeletePalletPosesMutation({
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
    mutationFn: () => deletePalletPoses(palletId),
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
