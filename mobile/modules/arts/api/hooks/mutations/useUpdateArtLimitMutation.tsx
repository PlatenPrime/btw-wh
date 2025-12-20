import {
  updateArtLimitById,
  type UpdateArtLimitRequest,
} from "@/modules/arts/api/services/mutations/updateArtLimitById";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateArtLimitMutationProps {
  artikul: string;
}

export function useUpdateArtLimitMutation({
  artikul,
}: UseUpdateArtLimitMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArtLimitRequest }) =>
      updateArtLimitById(id, data),

    onSuccess: () => {
      // Инвалидируем кеш для конкретного артикула и списка артикулов
      queryClient.invalidateQueries({
        queryKey: ["art", { artikul }],
      });
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
}

