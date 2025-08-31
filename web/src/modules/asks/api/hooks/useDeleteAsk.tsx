import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAskById } from "../services/deleteAskById";

export function useDeleteAsk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAskById(id),
    onSuccess: () => {
      // Инвалидируем кеш для asks, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}
