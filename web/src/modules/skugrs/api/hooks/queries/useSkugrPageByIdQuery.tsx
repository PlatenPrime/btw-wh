import { getSkugrPageById } from "@/modules/skugrs/api/services/queries/getSkugrPageById";
import { useQuery } from "@tanstack/react-query";

export interface UseSkugrPageByIdQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useSkugrPageByIdQuery({
  id,
  enabled = true,
}: UseSkugrPageByIdQueryParams) {
  return useQuery({
    queryKey: ["skugrs", "id", id],
    queryFn: ({ signal }) => getSkugrPageById(id!, signal),
    enabled: Boolean(id) && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
