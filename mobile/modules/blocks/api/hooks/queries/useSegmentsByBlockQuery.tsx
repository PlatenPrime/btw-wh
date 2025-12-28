import { useQuery } from "@tanstack/react-query";
import { getSegmentsByBlock } from "@/modules/blocks/api/services/queries/getSegmentsByBlock";
import type { SegmentsResponseDto } from "@/modules/blocks/api/types";

export interface UseSegmentsByBlockQueryParams {
  blockId: string;
  enabled?: boolean;
}

export function useSegmentsByBlockQuery({
  blockId,
  enabled = true,
}: UseSegmentsByBlockQueryParams) {
  return useQuery<SegmentsResponseDto>({
    queryKey: ["segs", { by: "block", blockId }],
    queryFn: ({ signal }) => {
      if (!blockId) throw new Error("blockId is required");
      return getSegmentsByBlock(blockId, signal);
    },
    enabled: !!blockId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

