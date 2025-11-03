import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  processPullPosition,
  type ProcessPullPositionParams,
} from "@/modules/pulls/api/services/mutations/processPullPosition";
import type {
  GetPullsResponse,
  GetPullByPalletIdResponse,
} from "@/modules/pulls/api/types/dto";

export function useProcessPullPositionMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: ProcessPullPositionParams) =>
      processPullPosition(params),
    onMutate: async (params) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["pulls"] });
      await queryClient.cancelQueries({
        queryKey: ["pulls", params.palletId],
      });

      // Snapshot previous values for rollback
      const previousPulls = queryClient.getQueryData<GetPullsResponse>([
        "pulls",
      ]);
      const previousPull = queryClient.getQueryData<GetPullByPalletIdResponse>([
        "pulls",
        params.palletId,
      ]);

      // Optimistically update
      if (previousPull && previousPull.data) {
        const updatedPull: GetPullByPalletIdResponse = {
          ...previousPull,
          data: {
            ...previousPull.data,
            positions: previousPull.data.positions.map((pos) =>
              pos.posId === params.posId
                ? {
                    ...pos,
                    currentQuant: Math.max(
                      0,
                      pos.currentQuant - params.data.actualQuant,
                    ),
                    currentBoxes: Math.max(
                      0,
                      pos.currentBoxes - params.data.actualBoxes,
                    ),
                  }
                : pos,
            ),
          },
        };
        queryClient.setQueryData(["pulls", params.palletId], updatedPull);
      }

      // Update pulls list if exists
      if (previousPulls && previousPulls.data) {
        const updatedPulls: GetPullsResponse = {
          ...previousPulls,
          data: {
            ...previousPulls.data,
            pulls: previousPulls.data.pulls.map((pull) =>
              pull.palletId === params.palletId
                ? {
                    ...pull,
                    positions: pull.positions.map((pos) =>
                      pos.posId === params.posId
                        ? {
                            ...pos,
                            currentQuant: Math.max(
                              0,
                              pos.currentQuant - params.data.actualQuant,
                            ),
                            currentBoxes: Math.max(
                              0,
                              pos.currentBoxes - params.data.actualBoxes,
                            ),
                          }
                        : pos,
                    ),
                  }
                : pull,
            ),
          },
        };
        queryClient.setQueryData(["pulls"], updatedPulls);
      }

      return { previousPulls, previousPull };
    },
    onSuccess: (data, params) => {
      // Check if this was the last position before invalidating
      const updatedPull = queryClient.getQueryData<GetPullByPalletIdResponse>([
        "pulls",
        params.palletId,
      ]);

      // If no positions left with currentQuant > 0, redirect to pulls page
      if (
        updatedPull?.data?.positions &&
        updatedPull.data.positions.every((pos) => pos.currentQuant === 0)
      ) {
        navigate("/refiling/pulls");
      }

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pulls"] });
      queryClient.invalidateQueries({
        queryKey: ["pulls", params.palletId],
      });

      // If ask completed, invalidate asks cache
      if (data.data?.askFullyProcessed) {
        queryClient.invalidateQueries({ queryKey: ["asks"] });
        toast.success(
          `Запит виконано! Оброблено ${data.data.askProgress} одиниць`,
        );
      } else {
        toast.success(
          `Позицію оброблено. Залишилось: ${data.data?.remainingQuant || 0}`,
        );
      }
    },
    onError: (error, params, context) => {
      // Rollback on error
      if (context?.previousPull) {
        queryClient.setQueryData(
          ["pulls", params.palletId],
          context.previousPull,
        );
      }
      if (context?.previousPulls) {
        queryClient.setQueryData(["pulls"], context.previousPulls);
      }

      const errorMessage =
        error instanceof Error ? error.message : "Помилка обробки позиції";
      toast.error("Помилка обробки позиції", {
        description: errorMessage,
      });
    },
  });
}

