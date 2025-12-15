import { bulkCreatePoses } from "@/modules/poses/api/services/mutations/bulkCreatePoses";
import type { BulkCreatePosDto } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBulkCreatePosesMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkCreatePosDto) => bulkCreatePoses(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId }],
      });

      // Инвалидируем pallet и row на основе данных из ответа
      if (response.data && response.data.length > 0) {
        const firstPos = response.data[0];
        queryClient.invalidateQueries({
          queryKey: ["pallet", { title: firstPos.palletData.title }],
        });
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle: firstPos.rowData.title }],
        });
      }
    },
  });
}
