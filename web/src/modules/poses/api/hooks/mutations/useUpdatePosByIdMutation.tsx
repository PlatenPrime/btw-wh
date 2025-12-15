import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePos } from "@/modules/poses/api/services/mutations/updatePos";
import type { UpdatePosDto } from "@/modules/poses/api/types";

export function useUpdatePosByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePosDto }) =>
      updatePos(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      
      // Инвалидируем pallet и row на основе данных из ответа
      if (response.data) {
        const pos = response.data;
        queryClient.invalidateQueries({
          queryKey: ["pallet", { title: pos.palletData.title }],
        });
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle: pos.rowData.title }],
        });
      } else {
        // Если данных нет в ответе, инвалидируем все rows
        queryClient.invalidateQueries({ queryKey: ["row"] });
      }
    },
  });
}
