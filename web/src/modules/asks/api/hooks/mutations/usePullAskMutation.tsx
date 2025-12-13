import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import type {
  AskDto,
  GetAskByIdResponse,
  GetAsksByDateResponse,
  GetAsksPullsResponse,
} from "@/modules/asks/api/types/dto";

interface UsePullAskMutationParams {
  askId: string;
}

export function usePullAskMutation({ askId }: UsePullAskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PullAskRequest) => pullAskById(askId, payload),
    onMutate: async (payload) => {
      // Отменяем исходящие запросы для ["asks", "pulls"]
      await queryClient.cancelQueries({ queryKey: ["asks", "pulls"] });

      // Сохраняем предыдущее значение кеша
      const previousPullsData = queryClient.getQueryData<GetAsksPullsResponse>([
        "asks",
        "pulls",
      ]);

      // Optimistically удаляем позицию из кеша по palletData._id и askId
      if (previousPullsData?.data) {
        queryClient.setQueryData<GetAsksPullsResponse>(
          ["asks", "pulls"],
          (oldData) => {
            if (!oldData?.data) return oldData;

            const updatedPositionsBySector = oldData.data.positionsBySector
              .map((sectorGroup) => ({
                ...sectorGroup,
                positions: sectorGroup.positions.filter(
                  (pos) =>
                    !(
                      pos.askId === askId &&
                      pos.palletData._id === payload.pullAskData.palletData._id
                    ),
                ),
              }))
              .filter((sectorGroup) => sectorGroup.positions.length > 0);

            return {
              ...oldData,
              data: {
                positionsBySector: updatedPositionsBySector,
              },
            };
          },
        );
      }

      // Возвращаем контекст для отката
      return { previousPullsData };
    },
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
      queryClient.invalidateQueries({ queryKey: ["asks", "pulls"] });
    },
    onError: (_error, _payload, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousPullsData) {
        queryClient.setQueryData(["asks", "pulls"], context.previousPullsData);
      }
    },
  });
}
