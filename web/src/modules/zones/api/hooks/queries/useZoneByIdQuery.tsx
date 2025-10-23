import { getZoneById } from "@/modules/zones/api/services/queries/getZoneById";
import { useQuery } from "@tanstack/react-query";

export interface UseZoneByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useZoneByIdQuery({ id, enabled = true }: UseZoneByIdQueryParams) {
  return useQuery({
    queryKey: ["zones", id],
    queryFn: ({ signal }) => getZoneById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

