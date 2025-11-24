import { getSegment } from "@/modules/blocks/api/services/queries/getSegment";
import type { SegmentResponse } from "@/modules/blocks/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseSegmentQueryParams {
  id: string;
  enabled?: boolean;
}

export function useSegmentQuery({ id, enabled = true }: UseSegmentQueryParams) {
  return useQuery<SegmentResponse>({
    queryKey: ["segs", id],
    queryFn: ({ signal }) => getSegment({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

