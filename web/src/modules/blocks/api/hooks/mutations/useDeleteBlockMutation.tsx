import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlock } from "@/modules/blocks/api/services/mutations/deleteBlock";

export function useDeleteBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blockId: string) => deleteBlock(blockId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
}

