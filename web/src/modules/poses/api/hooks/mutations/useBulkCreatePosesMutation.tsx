import { bulkCreatePoses } from "@/modules/poses/api/services";
import type { BulkCreatePosDto } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBulkCreatePosesMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkCreatePosDto) => bulkCreatePoses(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId }],
      });
    },
  });
}
