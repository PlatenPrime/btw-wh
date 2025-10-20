import {
  createAsk,
  type CreateAskRequest,
} from "@/modules/asks/api/services/mutations/createAsk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAskRequest) => createAsk(data),
    onSuccess: () => {
      // Инвалидируем кеш для asks, чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ["asks"] });

      // Инвалидируем кеш дефицитов, чтобы обновить информацию о существующих заявках
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
  });
}
