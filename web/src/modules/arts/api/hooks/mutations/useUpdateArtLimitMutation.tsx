// Реэкспорт из shared для обратной совместимости
import { artServices } from "@/lib/apiClient";
import { useUpdateArtLimitMutation as useUpdateArtLimitMutationShared } from "@shared/modules/arts";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export function useUpdateArtLimitMutation({
  artikul,
}: {
  artikul: Pick<ArtDto, "artikul">;
}) {
  return useUpdateArtLimitMutationShared({
    artikul,
    updateArtLimitById: artServices.updateArtLimitById,
  });
}

