// Реэкспорт из shared для обратной совместимости
import { artServices } from "@/lib/apiClient";
import { useOneArtQuery as useOneArtQueryShared } from "@shared/modules/arts";

export function useOneArtQuery(artikul?: string) {
  return useOneArtQueryShared({
    artikul,
    getOneArtByArtikul: artServices.getOneArtByArtikul,
  });
}

