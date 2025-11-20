import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlock } from "@/modules/blocks/api/services/mutations/createBlock";
import type { CreateBlockPayload } from "@/modules/blocks/api/types";

export function useCreateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlockPayload) => createBlock(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
}

