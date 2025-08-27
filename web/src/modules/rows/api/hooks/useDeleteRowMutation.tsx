import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRow } from "../index";

export function useDeleteRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rowId: string) => deleteRow(rowId),
    onSuccess: () => {
      // Invalidate and refetch rows list
      queryClient.invalidateQueries({ queryKey: ["rows"] });
    },
  });
}
