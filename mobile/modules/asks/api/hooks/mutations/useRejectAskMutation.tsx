import { rejectAskById } from "@/modules/asks/api/services/mutations/rejectAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRejectAskMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (solverId: string) => rejectAskById(id, solverId),
    onSuccess: () => {
      // Инвалидируем кеш для конкретного ask
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      // Инвалидируем кеш дефицитов, чтобы обновить информацию о существующих заявках
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
  });
}

