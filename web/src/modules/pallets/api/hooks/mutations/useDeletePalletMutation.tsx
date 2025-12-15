import { deletePallet } from "@/modules/pallets/api/services/mutations/deletePallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePalletMutation(rowId: string, rowTitle?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePallet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { rowId }] });
      queryClient.invalidateQueries({ queryKey: ["row", { rowId }] });
      if (rowTitle) {
        queryClient.invalidateQueries({ queryKey: ["row", { rowTitle }] });
      }
    },
  });
}
