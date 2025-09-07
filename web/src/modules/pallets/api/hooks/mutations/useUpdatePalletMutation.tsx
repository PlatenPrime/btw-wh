import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdatePalletDto } from "@/modules/pallets/api/types";
import { updatePallet } from "@/modules/pallets/api/services/mutations/updatePallet";

export function useUpdatePalletMutation(rowId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePalletDto }) =>
      updatePallet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { rowId }] });
      // Also invalidate any cached row queries to refresh row detail data
      queryClient.invalidateQueries({ queryKey: ["row"] });
    },
  });
}
