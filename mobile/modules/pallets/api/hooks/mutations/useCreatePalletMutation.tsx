import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPallet } from "@/modules/pallets/api/services/mutations/createPallet";
import type { CreatePalletDto } from "@/modules/pallets/api/types";

export function useCreatePalletMutation(rowId: string, rowTitle?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePalletDto) => createPallet(data),
    onSuccess: () => {
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

