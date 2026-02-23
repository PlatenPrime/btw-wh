import { deleteKonk } from "@/modules/konks/api/services/mutations/deleteKonk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteKonkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (konkId: string) => deleteKonk(konkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["konks"] });
    },
  });
}
