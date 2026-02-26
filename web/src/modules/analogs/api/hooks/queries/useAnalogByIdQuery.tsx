import { getAnalogById } from "@/modules/analogs/api/services/queries/getAnalogById";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogByIdQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useAnalogByIdQuery({
  id,
  enabled = true,
}: UseAnalogByIdQueryParams) {
  return useQuery({
    queryKey: ["analogs", "id", id],
    queryFn: ({ signal }) => getAnalogById(id!, signal),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
