import { getZoneByTitle } from "@/modules/zones/api/services/queries/getZoneByTitle";
import type { ZoneResponse } from "@/modules/zones/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseZoneByTitleQueryParams {
  title: string;
  enabled?: boolean;
}

export function useZoneByTitleQuery({
  title,
  enabled = true,
}: UseZoneByTitleQueryParams) {
  return useQuery<ZoneResponse>({
    queryKey: ["zones", "title", title],
    queryFn: ({ signal }) => getZoneByTitle({ title, signal }),
    enabled: enabled && !!title,
    staleTime: 5 * 60 * 1000,
  });
}
