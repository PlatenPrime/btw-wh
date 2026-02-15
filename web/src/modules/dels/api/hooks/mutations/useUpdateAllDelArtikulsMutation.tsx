import { updateAllDelArtikuls } from "@/modules/dels/api/services/mutations/updateAllDelArtikuls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UseUpdateAllDelArtikulsMutationParams {
  delId: string;
}

export function useUpdateAllDelArtikulsMutation({
  delId,
}: UseUpdateAllDelArtikulsMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateAllDelArtikuls(delId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dels", delId] });
      toast.success("Процес оновлення всіх артикулів запущено");
    },
    onError: (error: Error) => {
      toast.error("Помилка запуску оновлення", {
        description: error.message,
      });
    },
  });
}
