import { deleteAskById } from "@/modules/asks/api/services/mutations/deleteAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAskById(id),
    onSuccess: () => {
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      // Инвалидируем кеш дефицитов, чтобы обновить информацию о существующих заявках
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
  });
}

