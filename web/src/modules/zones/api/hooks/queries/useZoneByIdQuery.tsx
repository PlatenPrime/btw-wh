import { getZoneById } from "@/modules/zones/api/services/queries/getZoneById";
import type { ZoneResponse } from "@/modules/zones/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseZoneByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useZoneByIdQuery({
  id,
  enabled = true,
}: UseZoneByIdQueryParams) {
  return useQuery<ZoneResponse>({
    queryKey: ["zones", id],
    queryFn: ({ signal }) => getZoneById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}


