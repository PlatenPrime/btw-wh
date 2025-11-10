import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import type { AskDto } from "@/modules/asks/api/types/dto";
import type {
  Pull,
  PullPosition,
  PullsResponse,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";
import { updatePullsWithAsk } from "@/modules/pulls/utils/updatePullsWithAsk";

interface ProcessPullPositionInput {
  pull: Pull;
  position: PullPosition;
  actualQuant: number;
  actualBoxes: number;
  solverId: string;
}

interface MutationSuccessPayload {
  ask: AskDto;
  payload: ProcessPullPositionInput;
}

export function useProcessPullPositionMutation() {
  const queryClient = useQueryClient();

  return useMutation<MutationSuccessPayload, unknown, ProcessPullPositionInput>(
    {
      mutationFn: async (payload) => {
        const request: PullAskRequest = {
          solverId: payload.solverId,
          action: "pull",
          pullAskData: {
            palletData: {
              _id: payload.pull.palletId,
              title: payload.pull.palletTitle,
            },
            quant: payload.actualQuant,
            boxes: payload.actualBoxes,
          },
        };

        const ask = await pullAskById(payload.position.askId, request);

        return { ask, payload };
      },
      onSuccess: ({ ask, payload }) => {
        queryClient.setQueryData<
          PullsResponsePayload | PullsResponse | undefined
        >(["pulls"], (state) => {
          if (!state) {
            return state;
          }

          const isPayload = (value: unknown): value is PullsResponsePayload =>
            Boolean(value) &&
            typeof value === "object" &&
            "pulls" in (value as Record<string, unknown>) &&
            Array.isArray((value as PullsResponsePayload).pulls);

          const isEnvelope = (value: unknown): value is PullsResponse =>
            Boolean(value) &&
            typeof value === "object" &&
            "data" in (value as Record<string, unknown>) &&
            isPayload((value as PullsResponse).data);

          if (isEnvelope(state)) {
            const nextPayload = updatePullsWithAsk({
              state: state.data,
              ask,
              overridePulled: {
                deltaQuant: payload.actualQuant,
                deltaBoxes: payload.actualBoxes,
              },
            });

            if (!nextPayload) {
              return state;
            }

            return {
              ...state,
              data: nextPayload,
            };
          }

          if (!isPayload(state)) {
            return state;
          }

          return updatePullsWithAsk({
            state,
            ask,
            overridePulled: {
              deltaQuant: payload.actualQuant,
              deltaBoxes: payload.actualBoxes,
            },
          });
        });

        queryClient.invalidateQueries({ queryKey: ["asks", ask._id] });
        queryClient.invalidateQueries({ queryKey: ["asks"] });

        toast.success("Прогрес заявки оновлено", {
          description: `Знято ${payload.actualQuant} шт. / ${payload.actualBoxes} кор. з ${payload.pull.palletTitle}`,
        });
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Не вдалося оновити заявку";

        toast.error("Помилка обробки позиції", {
          description: message,
        });
      },
    },
  );
}
