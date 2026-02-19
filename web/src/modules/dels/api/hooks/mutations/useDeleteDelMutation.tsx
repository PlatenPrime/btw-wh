import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDel } from "@/modules/dels/api/services/mutations/deleteDel";

export function useDeleteDelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (delId: string) => deleteDel(delId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dels"] });
    },
  });
}
