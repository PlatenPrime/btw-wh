import { getZonesBySegment } from "@/modules/blocks/api/services/queries/getZonesBySegment";
import type { ZonesBySegmentResponse } from "@/modules/blocks/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseZonesBySegmentQueryParams {
  segId: string;
  enabled?: boolean;
}

export function useZonesBySegmentQuery({
  segId,
  enabled = true,
}: UseZonesBySegmentQueryParams) {
  return useQuery<ZonesBySegmentResponse>({
    queryKey: ["zones", "seg", segId],
    queryFn: ({ signal }) => getZonesBySegment({ segId, signal }),
    placeholderData: keepPreviousData,
    enabled: enabled && !!segId,
    staleTime: 5 * 60 * 1000,
  });
}

