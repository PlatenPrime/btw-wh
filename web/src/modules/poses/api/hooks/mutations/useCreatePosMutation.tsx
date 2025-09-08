import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPos } from "@/modules/poses/api/services/mutations/createPos";
import type { CreatePosDto } from "@/modules/poses/api/types";

export function useCreatePosMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePosDto) => createPos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
    },
  });
}
