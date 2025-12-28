import { getZoneById } from "@/modules/zones/api/services/queries/getZoneById";
import type { ZoneResponse } from "@/modules/zones/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useZoneByIdQuery(zoneId?: string) {
  return useQuery<ZoneResponse>({
    queryKey: ["zone", { zoneId }],
    queryFn: ({ signal }) => {
      if (!zoneId) throw new Error("Zone ID is missing");
      return getZoneById(zoneId, signal);
    },
    enabled: !!zoneId,
    staleTime: 5 * 60 * 1000,
  });
}

