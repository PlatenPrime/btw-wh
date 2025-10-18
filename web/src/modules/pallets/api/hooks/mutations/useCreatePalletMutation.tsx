import { createPallet } from "@/modules/pallets/api/services";
import type { CreatePalletDto } from "@/modules/pallets/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePalletMutation(rowId: string, rowTitle?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePalletDto) => createPallet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { rowId }] });
      if (rowTitle) {
        queryClient.invalidateQueries({ queryKey: ["row", { rowTitle }] });
      }
    },
  });
}
