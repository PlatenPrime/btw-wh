import { getGraboSkus } from "@/modules/grabo-skus/api/services/queries/getGraboSkus";
import {
  EMPTY_GRABO_SKU_FILTER_OPTIONS,
  type GraboSkuFilterOptionsDto,
} from "@/modules/grabo-skus/api/types";
import { useQuery } from "@tanstack/react-query";

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
      return res.filterOptions ?? EMPTY_GRABO_SKU_FILTER_OPTIONS;
    },
    enabled,
    staleTime: 30 * 60 * 1000,
  });
}
