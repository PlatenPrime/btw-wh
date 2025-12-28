import { useQuery } from "@tanstack/react-query";
import { getBlocks } from "@/modules/blocks/api/services/queries/getBlocks";
import type { BlocksResponseDto } from "@/modules/blocks/api/types";

export function useBlocksQuery(enabled = true) {
  return useQuery<BlocksResponseDto>({
    queryKey: ["blocks"],
    queryFn: ({ signal }) => getBlocks(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

