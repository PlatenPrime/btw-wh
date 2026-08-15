import { getGraboSkus } from "@/modules/grabo-skus/api/services/queries/getGraboSkus";
import type { GraboSkuFilterOptionsDto } from "@/modules/grabo-skus/api/types";
import { useQuery } from "@tanstack/react-query";

const EMPTY_FILTER_OPTIONS: GraboSkuFilterOptionsDto = {
  color: [],
  size: [],
  material: [],
  gas: [],
  language: [],
};

export function useGraboSkuFilterOptionsQuery(enabled = true) {
  return useQuery<GraboSkuFilterOptionsDto>({
    queryKey: ["graboSkus", "filterOptions"],
    queryFn: async ({ signal }) => {
      const res = await getGraboSkus({
        page: 1,
        limit: 1,
        includeFilterOptions: true,
        signal,
      });
      return res.filterOptions ?? EMPTY_FILTER_OPTIONS;
    },
    enabled,
    staleTime: 30 * 60 * 1000,
  });
}
