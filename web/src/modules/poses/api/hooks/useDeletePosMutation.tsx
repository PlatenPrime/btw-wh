import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePos } from "../services/deletePos";
import type { IPos } from "../types/index";

export function useDeletePosMutation(pos: IPos) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { title: pos.palletData.title }],
      });
    },
  });
} 