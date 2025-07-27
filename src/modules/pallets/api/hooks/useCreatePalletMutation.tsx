import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPallet } from "../services/createPallet";
import type { CreatePalletDto } from "../types";

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
