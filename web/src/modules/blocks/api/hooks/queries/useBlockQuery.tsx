import { useQuery } from "@tanstack/react-query";
import { getBlockById } from "@/modules/blocks/api/services/queries/getBlockById";

interface UseBlockQueryParams {
  id?: string;
  enabled?: boolean;
}

export function useBlockQuery({ id, enabled = true }: UseBlockQueryParams) {
  return useQuery({
    queryKey: ["blocks", id],
    queryFn: ({ signal }) => {
      if (!id) {
        throw new Error("Block id is required");
      }

      return getBlockById(id, signal);
    },
    enabled: enabled && Boolean(id),
    staleTime: 1000 * 60 * 2,
  });
}

