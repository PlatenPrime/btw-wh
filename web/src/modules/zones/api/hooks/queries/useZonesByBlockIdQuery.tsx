import { getZonesByBlockId } from "@/modules/zones/api/services/queries/getZonesByBlockId";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseZonesByBlockIdQueryParams {
  blockId: string;
  enabled?: boolean;
}

export function useZonesByBlockIdQuery({
  blockId,
  enabled = true,
}: UseZonesByBlockIdQueryParams) {
  return useQuery({
    queryKey: ["zones", "by-block", blockId],
    queryFn: ({ signal }) => getZonesByBlockId({ blockId, signal }),
    enabled: enabled && !!blockId,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

