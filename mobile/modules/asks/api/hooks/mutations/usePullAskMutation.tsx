import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePullAskMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PullAskRequest) => pullAskById(id, data),
    onSuccess: () => {
      // Инвалидируем кеш для конкретного ask
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      // Инвалидируем позиции для снятия
      queryClient.invalidateQueries({ queryKey: ["asks", id, "pull"] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      // Инвалидируем все позиции для снятия
      queryClient.invalidateQueries({ queryKey: ["asks", "pulls"] });
    },
  });
}

