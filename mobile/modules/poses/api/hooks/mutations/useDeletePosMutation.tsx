import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePos } from "@/modules/poses/api/services/mutations/deletePos";
import type { IPos } from "@/modules/poses/api/types";

export function useDeletePosMutation(pos: IPos) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { palletId: pos.pallet }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { rowId: pos.row }],
      });
    },
    onError: () => {
    },
  });
}

