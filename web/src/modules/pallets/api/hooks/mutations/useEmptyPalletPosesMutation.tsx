import { deletePalletEmptyPoses } from "@/modules/pallets/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePalletEmptyPosesMutation({
  palletId,
  palletTitle,
}: {
  palletId: string;
  palletTitle: string;
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
    },
  });
}
