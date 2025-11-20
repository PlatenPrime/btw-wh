import { useQuery } from "@tanstack/react-query";
import { getBlocks } from "@/modules/blocks/api/services/queries/getBlocks";

export function useBlocksQuery(enabled = true) {
  return useQuery({
    queryKey: ["blocks"],
    queryFn: ({ signal }) => getBlocks(signal),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
}

