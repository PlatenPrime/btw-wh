import {
  updateAskActionsById,
  type UpdateAskActionsRequest,
} from "@/modules/asks/api/services/mutations/updateAskActionsById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAskActionsByIdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAskActionsRequest }) =>
      updateAskActionsById(id, data),
    onSuccess: (_, { id }) => {
      // Инвалидируем кеш для конкретного ask и списка asks
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}

