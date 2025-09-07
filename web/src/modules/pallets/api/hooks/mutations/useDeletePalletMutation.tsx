import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePallet } from "@/modules/pallets/api/services/mutations/deletePallet";

export function useDeletePalletMutation(rowId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePallet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { rowId }] });
    },
  });
}
