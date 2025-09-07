import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreatePoses } from "@/modules/poses/api/services/mutations/bulkCreatePoses";
import type { BulkCreatePosDto } from "@/modules/poses/api/types";

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
