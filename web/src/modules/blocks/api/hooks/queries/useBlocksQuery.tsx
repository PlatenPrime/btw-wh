import { getBlocks } from "@/modules/blocks/api/services/queries/getBlocks";
import type { BlocksResponseDto } from "@/modules/blocks/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseBlocksQueryParams {
  enabled?: boolean;
}

export function useBlocksQuery({ enabled = true }: UseBlocksQueryParams = {}) {
  return useQuery<BlocksResponseDto>({
    queryKey: ["blocks"],
    queryFn: ({ signal }) => getBlocks({ signal }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

