import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatePalletDto, UpdatePalletDto } from "../types";
import { createPallet, deletePallet, updatePallet } from "./index";

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
