import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlock } from "@/modules/blocks/api/services/mutations/updateBlock";
import type { UpdateBlockPayload } from "@/modules/blocks/api/types";

interface UseUpdateBlockMutationParams {
  blockId: string;
}

export function useUpdateBlockMutation({
  blockId,
}: UseUpdateBlockMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBlockPayload) => updateBlock(blockId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["blocks", blockId] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
}

