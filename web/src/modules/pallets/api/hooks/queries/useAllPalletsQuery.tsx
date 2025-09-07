import { useQuery } from "@tanstack/react-query";
import { getAllPallets } from "@/modules/pallets/api/services/queries/getAllPallets";
import type { PalletListResponse } from "@/modules/pallets/api/types";

export function useAllPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", {option: "all" }],
    queryFn: ({ signal }) => getAllPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
