import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePallet } from "../services/updatePallet";
import type { UpdatePalletDto } from "../types";

export function useUpdatePalletMutation(rowId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePalletDto }) =>
      updatePallet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallets", { rowId }] });
    },
  });
}
