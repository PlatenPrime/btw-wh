import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePos } from "../services/updatePos";
import type { UpdatePosDto } from "../types/index";

export function useUpdatePosMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePosDto }) =>
      updatePos(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
    },
  });
}
