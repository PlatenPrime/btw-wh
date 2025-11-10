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

  return useMutation<MutationSuccessPayload, unknown, ProcessPullPositionInput>({
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
      queryClient.setQueryData<PullsResponsePayload | undefined>(
        ["pulls"],
        (state) => updatePullsWithAsk({ state, ask }),
      );

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
  });
}
