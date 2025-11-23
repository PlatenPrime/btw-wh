import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtsWithoutLatestMarker } from "@/modules/arts/api/services/mutations/deleteArtsWithoutLatestMarker";

export function useDeleteArtsWithoutLatestMarkerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteArtsWithoutLatestMarker(),

    onSuccess: () => {
      // Инвалидируем кеш артикулов для обновления списка
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
}

