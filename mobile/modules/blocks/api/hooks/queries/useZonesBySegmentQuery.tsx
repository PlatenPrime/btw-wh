import { useQuery } from "@tanstack/react-query";
import { getZonesBySegment } from "@/modules/blocks/api/services/queries/getZonesBySegment";
import type { ZonesBySegmentResponse } from "@/modules/blocks/api/types";

export interface UseZonesBySegmentQueryParams {
  segId: string;
  enabled?: boolean;
}

export function useZonesBySegmentQuery({
  segId,
  enabled = true,
}: UseZonesBySegmentQueryParams) {
  return useQuery<ZonesBySegmentResponse>({
    queryKey: ["zones", { by: "segment", segId }],
    queryFn: ({ signal }) => {
      if (!segId) throw new Error("segId is required");
      return getZonesBySegment(segId, signal);
    },
    enabled: !!segId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

