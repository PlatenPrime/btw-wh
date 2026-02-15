import { patchDelArtikul } from "@/modules/dels/api/services/mutations/patchDelArtikul";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UsePatchDelArtikulMutationParams {
  delId: string;
}

export function usePatchDelArtikulMutation({ delId }: UsePatchDelArtikulMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ artikul }: { artikul: string }) =>
      patchDelArtikul({ id: delId, artikul }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dels", delId] });
      toast.success("Артикул оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення артикула", {
        description: error.message,
      });
    },
  });
}
