import { deletePalletPoses } from "@/modules/pallets/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePalletPosesMutation({
  palletId,
  palletTitle,
}: {
  palletId: string;
  palletTitle: string;
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
    },
  });
}
