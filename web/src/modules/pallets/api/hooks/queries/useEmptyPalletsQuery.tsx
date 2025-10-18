import { getEmptyPallets } from "@/modules/pallets/api/services";
import type { PalletListResponse } from "@/modules/pallets/api/types";
import { useQuery } from "@tanstack/react-query";

export function useEmptyPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", { option: "empty" }],
    queryFn: ({ signal }) => getEmptyPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
