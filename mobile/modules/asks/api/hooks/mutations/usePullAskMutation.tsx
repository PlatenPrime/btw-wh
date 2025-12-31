import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UsePullAskMutationParams {
  askId: string;
}

export function usePullAskMutation({ askId }: UsePullAskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PullAskRequest) => pullAskById(askId, data),
    onSuccess: () => {
      // Инвалидируем кеш для конкретного ask
      queryClient.invalidateQueries({ queryKey: ["asks", askId] });
      // Инвалидируем позиции для снятия
      queryClient.invalidateQueries({ queryKey: ["asks", askId, "pull"] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      // Инвалидируем все позиции для снятия
      queryClient.invalidateQueries({ queryKey: ["asks", "pulls"] });
    },
    onError: () => {
    },
  });
}

