import { getPalletGroups } from "@/modules/pallet-groups/api/services/queries/getPalletGroups";
import type { PalletGroupsResponseDto } from "@/modules/pallet-groups/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UsePalletGroupsQueryParams {
  enabled?: boolean;
}

export function usePalletGroupsQuery({
  enabled = true,
}: UsePalletGroupsQueryParams = {}) {
  return useQuery<PalletGroupsResponseDto>({
    queryKey: ["pallet-groups"],
    queryFn: ({ signal }) => getPalletGroups({ signal }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
