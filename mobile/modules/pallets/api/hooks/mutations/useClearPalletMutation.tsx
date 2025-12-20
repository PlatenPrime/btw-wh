import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearPallet } from "@/modules/pallets/api/services/mutations/clearPallet";

export function useClearPalletMutation({
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
    mutationFn: () => clearPallet(palletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { id: palletId }],
      });
      if (rowTitle) {
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle }],
        });
      }
    },
  });
}

