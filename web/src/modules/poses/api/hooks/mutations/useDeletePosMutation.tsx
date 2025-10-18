import { deletePos } from "@/modules/poses/api/services";
import type { IPos } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
