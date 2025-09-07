import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateAskById,
  type UpdateAskRequest,
} from "@/modules/asks/api/services/mutations/updateAskById";

export function useUpdateAsk() {
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
