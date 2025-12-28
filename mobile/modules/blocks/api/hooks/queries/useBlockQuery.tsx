import { useQuery } from "@tanstack/react-query";
import { getBlock } from "@/modules/blocks/api/services/queries/getBlock";
import type { BlockResponse } from "@/modules/blocks/api/types";

export interface UseBlockQueryParams {
  id: string;
  enabled?: boolean;
}

export function useBlockQuery({ id, enabled = true }: UseBlockQueryParams) {
  return useQuery<BlockResponse>({
    queryKey: ["blocks", id],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("id is required");
      return getBlock(id, signal);
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

