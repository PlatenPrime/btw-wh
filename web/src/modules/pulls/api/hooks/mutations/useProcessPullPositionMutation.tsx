import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { completeAskById } from "@/modules/asks/api/services/mutations/completeAskById";
import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { updatePos } from "@/modules/poses/api/services/mutations/updatePos";
import { hasAskRemainingPositions } from "@/modules/pulls/utils/hasAskRemainingPositions";
import type { Pull, PullPosition } from "@/modules/pulls/api/types";

interface ProcessPullPositionInput {
  pull: Pull;
  position: PullPosition;
  actualQuant: number;
  actualBoxes: number;
  solverId: string;
}

export function useProcessPullPositionMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { ask: AskDto; payload: ProcessPullPositionInput },
    unknown,
    ProcessPullPositionInput
  >({
    mutationFn: async (payload) => {
      const { position, actualQuant, actualBoxes } = payload;

      const nextQuant = Math.max(position.currentQuant - actualQuant, 0);
      const nextBoxes = Math.max(position.currentBoxes - actualBoxes, 0);

      const rollbackQuant = position.currentQuant;
      const rollbackBoxes = position.currentBoxes;

      await updatePos(position.posId, {
        quant: nextQuant,
        boxes: nextBoxes,
      });

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

      try {
        const ask = await pullAskById(payload.position.askId, request);

        return { ask, payload };
      } catch (error) {
        await updatePos(position.posId, {
          quant: rollbackQuant,
          boxes: rollbackBoxes,
        }).catch(() => {
          // оставляем лог только в консоли, чтобы не прерывать исходную ошибку
          console.error("Не вдалося відкрутити позицію після помилки pullAsk");
        });

        throw error;
      }
    },
    onSuccess: async ({ ask, payload }) => {
      const requestedQuant = payload.position.totalRequestedQuant;
      const pulledQuant = ask.pullQuant ?? 0;
      const nextCurrentQuant = Math.max(
        payload.position.currentQuant - payload.actualQuant,
        0,
      );
      const nextCurrentBoxes = Math.max(
        payload.position.currentBoxes - payload.actualBoxes,
        0,
      );
      const askHasOpenPositions = hasAskRemainingPositions({
        queryClient,
        ask,
        overridePulled: {
          deltaQuant: payload.actualQuant,
          deltaBoxes: payload.actualBoxes,
          nextCurrentQuant,
          nextCurrentBoxes,
        },
      });
      const shouldComplete =
        ask.status === "new" &&
        ((requestedQuant != null && pulledQuant >= requestedQuant) ||
          !askHasOpenPositions);

      if (shouldComplete) {
        try {
          await completeAskById(ask._id, payload.solverId);
        } catch (error) {
          const description =
            error instanceof Error ? error.message : undefined;

          toast.warning("Заявку не вдалося завершити автоматично", {
            description,
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["asks", ask._id] });
      queryClient.invalidateQueries({ queryKey: ["asks"] });
      queryClient.invalidateQueries({ queryKey: ["pulls"] });

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
  });
}
