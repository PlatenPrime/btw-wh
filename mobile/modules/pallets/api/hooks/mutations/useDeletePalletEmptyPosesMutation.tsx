import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePalletEmptyPoses } from "@/modules/pallets/api/services/mutations/deletePalletEmptyPoses";

export function useDeletePalletEmptyPosesMutation({
  palletId,
  palletTitle,
  rowId,
  rowTitle,
}: {
  palletId: string;
  palletTitle: string;
  rowId?: string;
  rowTitle?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePalletEmptyPoses(palletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { id: palletId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { palletId }],
      });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      if (rowId) {
        queryClient.invalidateQueries({
          queryKey: ["pallets", { by: "row", rowId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["row", { rowId }],
        });
      }
      if (rowTitle) {
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle }],
        });
      }
    },
    onError: () => {
    },
  });
}

