import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateArtLimitRequest } from "../../services/mutations/updateArtLimitById";
import type { ArtDto } from "../../types/dto";

interface UseUpdateArtLimitMutationProps {
  artikul: Pick<ArtDto, "artikul">;
  updateArtLimitById: (
    id: string,
    data: UpdateArtLimitRequest
  ) => Promise<ArtDto>;
}

export function useUpdateArtLimitMutation({
  artikul,
  updateArtLimitById,
}: UseUpdateArtLimitMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArtLimitRequest }) =>
      updateArtLimitById(id, data),

    onSuccess: () => {
      // Инвалидируем кеш для конкретного артикула и списка артикулов
      queryClient.invalidateQueries({
        queryKey: ["art", { artikul: artikul }],
      });
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
}
