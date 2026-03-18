import { getVariantById } from "@/modules/variants/api/services/queries/getVariantById";
import { useQuery } from "@tanstack/react-query";

export interface UseVariantByIdQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useVariantByIdQuery({
  id,
  enabled = true,
}: UseVariantByIdQueryParams) {
  return useQuery({
    queryKey: ["variants", "id", id],
    queryFn: ({ signal }) => getVariantById(id!, signal),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

