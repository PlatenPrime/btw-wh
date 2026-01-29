import { getFreePallets } from "@/modules/pallet-groups/api/services/queries/getFreePallets";
import type { FreePalletsResponseDto } from "@/modules/pallet-groups/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseFreePalletsQueryParams {
  enabled?: boolean;
}

export function useFreePalletsQuery({
  enabled = true,
}: UseFreePalletsQueryParams = {}) {
  return useQuery<FreePalletsResponseDto>({
    queryKey: ["pallet-groups", "free-pallets"],
    queryFn: ({ signal }) => getFreePallets({ signal }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
