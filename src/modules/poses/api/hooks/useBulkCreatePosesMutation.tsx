import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreatePoses } from "../services/bulkCreatePoses";
import type { BulkCreatePosDto } from "../types/index";

export function useBulkCreatePosesMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkCreatePosDto) => bulkCreatePoses(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
    },
  });
}
