import {
  updateAskActionsById,
  type UpdateAskActionsRequest,
} from "@/modules/asks/api/services/mutations/updateAskActionsById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAskActionsMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAskActionsRequest) =>
      updateAskActionsById(id, data),
    onSuccess: () => {
      // Инвалидируем кеш для конкретного ask
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      // Инвалидируем все списки asks
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}

