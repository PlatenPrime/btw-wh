import { deletePallet } from "@/modules/pallets/api/services/mutations/deletePallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePalletMutation(
  rowId: string,
  rowTitle?: string,
  palletId?: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePallet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      if (palletId) {
        queryClient.invalidateQueries({
          queryKey: ["poses", { by: "pallet", palletId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["pallet", { palletId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["pallet", { id: palletId }],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { by: "row", rowId }] });
      queryClient.invalidateQueries({ queryKey: ["row", { rowId }] });
      if (rowTitle) {
        queryClient.invalidateQueries({ queryKey: ["row", { rowTitle }] });
      }
    },
    onError: () => {
    },
  });
}

