// Реэкспорт из shared для обратной совместимости
import { artServices } from "@/lib/apiClient";
import { useBtradeArtDataQuery as useBtradeArtDataQueryShared } from "@shared/modules/arts";

export function useBtradeArtDataQuery(artikul: string) {
  return useBtradeArtDataQueryShared({
    artikul,
    getBtradeArtDataByArtikul: artServices.getBtradeArtDataByArtikul,
  });
}

