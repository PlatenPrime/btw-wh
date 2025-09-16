import { executeAskById } from "@/modules/asks/api/services/mutations/executeAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useExecuteAskMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (solverId: string) => executeAskById(id, solverId),
    onSuccess: () => {
      // Инвалидируем кеш для конкретного ask
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}
