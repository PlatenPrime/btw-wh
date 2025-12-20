import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRow } from "@/modules/rows/api/services/mutations/deleteRow";

export function useDeleteRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rowId: string) => deleteRow(rowId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rows"] });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
    },
  });
}

