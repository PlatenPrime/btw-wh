import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePos } from "../services/deletePos";

export function useDeletePosMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
    },
  });
} 