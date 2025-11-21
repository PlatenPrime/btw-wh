import { getBlock } from "@/modules/blocks/api/services/queries/getBlock";
import type { BlockResponse } from "@/modules/blocks/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseBlockQueryParams {
  id: string;
  enabled?: boolean;
}

export function useBlockQuery({ id, enabled = true }: UseBlockQueryParams) {
  return useQuery<BlockResponse>({
    queryKey: ["blocks", id],
    queryFn: ({ signal }) => getBlock({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

