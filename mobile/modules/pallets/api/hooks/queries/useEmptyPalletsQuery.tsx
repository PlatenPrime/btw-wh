import { useQuery } from "@tanstack/react-query";
import type { PalletListResponse } from "@/modules/pallets/api/types";
import { getEmptyPallets } from "@/modules/pallets/api/services/queries/getEmptyPallets";

export function useEmptyPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", { option: "empty" }],
    queryFn: ({ signal }) => getEmptyPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

