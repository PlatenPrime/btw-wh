import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  pullAskById,
  type PullAskRequest,
} from "@/modules/asks/api/services/mutations/pullAskById";

interface UsePullAskMutationParams {
  askId: string;
}

export function usePullAskMutation({ askId }: UsePullAskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PullAskRequest) => pullAskById(askId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asks", askId] });
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}

