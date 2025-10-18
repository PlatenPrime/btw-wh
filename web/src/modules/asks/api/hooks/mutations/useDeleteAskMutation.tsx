import { deleteAskById } from "@/modules/asks/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAskMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAskById(id),
    onSuccess: () => {
      // Удаляем конкретный запрос из кэша вместо инвалидации
      queryClient.removeQueries({ queryKey: ["asks", id] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({
        queryKey: ["asks"],
      });
      // Инвалидируем кеш дефицитов, чтобы обновить информацию о существующих заявках
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
  });
}
