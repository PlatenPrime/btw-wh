import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePos } from "@/modules/poses/api/services/mutations/updatePos";
import type { IPos, UpdatePosDto } from "@/modules/poses/api/types";

export function useUpdatePosMutation(pos: IPos) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePosDto }) =>
      updatePos(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { palletId: pos.pallet }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { rowId: pos.row }],
      });
    },
  });
}

