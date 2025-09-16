import {
  updateAskById,
  type UpdateAskRequest,
} from "@/modules/asks/api/services/mutations/updateAskById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAskRequest }) =>
      updateAskById(id, data),
    onSuccess: (_, { id }) => {
      // Инвалидируем кеш для конкретного ask и списка asks
      queryClient.invalidateQueries({ queryKey: ["asks", id] });
      queryClient.invalidateQueries({ queryKey: ["asks"] });
    },
  });
}
