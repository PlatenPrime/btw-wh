import { getSkuById } from "@/modules/skus/api/services/queries/getSkuById";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuByIdQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useSkuByIdQuery({
  id,
  enabled = true,
}: UseSkuByIdQueryParams) {
  return useQuery({
    queryKey: ["skus", "id", id],
    queryFn: ({ signal }) => getSkuById(id!, signal),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
