import { createPos } from "@/modules/poses/api/services";
import type { CreatePosDto } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePosMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePosDto) => createPos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId }],
      });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
    },
  });
}
