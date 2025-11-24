import { getSegmentsByBlock } from "@/modules/blocks/api/services/queries/getSegmentsByBlock";
import type { SegmentsResponseDto } from "@/modules/blocks/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSegmentsByBlockQueryParams {
  blockId: string;
  enabled?: boolean;
}

export function useSegmentsByBlockQuery({
  blockId,
  enabled = true,
}: UseSegmentsByBlockQueryParams) {
  return useQuery<SegmentsResponseDto>({
    queryKey: ["segs", "block", blockId],
    queryFn: ({ signal }) => getSegmentsByBlock({ blockId, signal }),
    placeholderData: keepPreviousData,
    enabled: enabled && !!blockId,
    staleTime: 5 * 60 * 1000,
  });
}

