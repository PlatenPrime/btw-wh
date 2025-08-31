import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAsk, type CreateAskRequest } from "../services/createAsk";

export function useCreateAsk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAskRequest) => createAsk(data),
    onSuccess: () => {
      // Инвалидируем кеш для asks, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}
