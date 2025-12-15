import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRow } from "@/modules/rows/api/services/mutations/deleteRow";

export function useDeleteRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rowId: string) => deleteRow(rowId),
    onSuccess: () => {
      // Invalidate and refetch rows list
      queryClient.invalidateQueries({ queryKey: ["rows"] });
      // Инвалидируем pallets, так как при удалении ряда паллеты теряют связь с рядом
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
    },
  });
}
