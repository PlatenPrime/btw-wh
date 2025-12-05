import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import type {
  AskDto,
  GetAskByIdResponse,
  GetAsksByDateResponse,
} from "@/modules/asks/api/types/dto";

interface UsePullAskMutationParams {
  askId: string;
}

export function usePullAskMutation({ askId }: UsePullAskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PullAskRequest) => pullAskById(askId, payload),
    onSuccess: (updatedAsk: AskDto) => {
      // Обновляем кеш для конкретного ask
      queryClient.setQueryData<GetAskByIdResponse>(
        ["asks", askId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: updatedAsk,
          };
        },
      );

      // Обновляем кеш списков asks по дате
      queryClient.setQueriesData<GetAsksByDateResponse>(
        { queryKey: ["asks", "by-date"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((ask) =>
              ask._id === updatedAsk._id ? updatedAsk : ask,
            ),
          };
        },
      );

      // Инвалидируем для других запросов как fallback
      queryClient.invalidateQueries({ queryKey: ["asks", askId] });
      queryClient.invalidateQueries({ queryKey: ["asks", askId, "pull"] });
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}
