import { useQuery } from "@tanstack/react-query";
import { getSegment } from "@/modules/blocks/api/services/queries/getSegment";
import type { SegmentResponse } from "@/modules/blocks/api/types";

export interface UseSegmentQueryParams {
  id: string;
  enabled?: boolean;
}

export function useSegmentQuery({ id, enabled = true }: UseSegmentQueryParams) {
  return useQuery<SegmentResponse>({
    queryKey: ["segs", id],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("id is required");
      return getSegment(id, signal);
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

