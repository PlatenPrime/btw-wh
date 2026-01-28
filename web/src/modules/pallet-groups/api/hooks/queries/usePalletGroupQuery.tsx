import { getPalletGroup } from "@/modules/pallet-groups/api/services/queries/getPalletGroup";
import type { PalletGroupResponseDto } from "@/modules/pallet-groups/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UsePalletGroupQueryParams {
  id?: string;
  enabled?: boolean;
}

export function usePalletGroupQuery({
  id,
  enabled = true,
}: UsePalletGroupQueryParams) {
  return useQuery<PalletGroupResponseDto>({
    queryKey: ["pallet-groups", id],
    queryFn: ({ signal }) => {
      if (!id) {
        throw new Error("Pallet group id is required");
      }
      return getPalletGroup({ id, signal });
    },
    enabled: Boolean(id) && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
