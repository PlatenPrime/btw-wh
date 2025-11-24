import { getSegments } from "@/modules/blocks/api/services/queries/getSegments";
import type { SegmentsResponseDto } from "@/modules/blocks/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSegmentsQueryParams {
  enabled?: boolean;
}

export function useSegmentsQuery({ enabled = true }: UseSegmentsQueryParams = {}) {
  return useQuery<SegmentsResponseDto>({
    queryKey: ["segs"],
    queryFn: ({ signal }) => getSegments({ signal }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

