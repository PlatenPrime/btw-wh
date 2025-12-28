import { getArtsByZone } from "@/modules/arts/api/services/queries/getArtsByZone";
import type { ArtsByZoneResponse } from "@/modules/arts/api/services/queries/getArtsByZone";
import { useQuery } from "@tanstack/react-query";

export function useArtsByZoneQuery(zone?: string) {
  return useQuery<ArtsByZoneResponse>({
    queryKey: ["arts-by-zone", zone],
    queryFn: ({ signal }) => {
      if (!zone) throw new Error("zone is required");
      return getArtsByZone(zone, signal);
    },
    enabled: !!zone,
    staleTime: 5 * 60 * 1000,
  });
}

