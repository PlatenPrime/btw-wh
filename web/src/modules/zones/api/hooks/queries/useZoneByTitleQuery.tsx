import { getZoneByTitle } from "@/modules/zones/api/services/queries/getZoneByTitle";
import { useQuery } from "@tanstack/react-query";

export interface UseZoneByTitleQueryParams {
  title: string;
  enabled?: boolean;
}

export function useZoneByTitleQuery({ title, enabled = true }: UseZoneByTitleQueryParams) {
  return useQuery({
    queryKey: ["zones", "title", title],
    queryFn: ({ signal }) => getZoneByTitle({ title, signal }),
    enabled: enabled && !!title,
    staleTime: 5 * 60 * 1000,
  });
}

