import { getGraboSkuById } from "@/modules/grabo-skus/api/services/queries/getGraboSkuById";
import { useQuery } from "@tanstack/react-query";

export interface UseGraboSkuByIdQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useGraboSkuByIdQuery({
  id,
  enabled = true,
}: UseGraboSkuByIdQueryParams) {
  return useQuery({
    queryKey: ["graboSkus", "id", id],
    queryFn: ({ signal }) => getGraboSkuById(id!, signal),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
