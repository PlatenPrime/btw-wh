import { useQuery } from "@tanstack/react-query";
import { getAllPallets } from "../services/getAllPallets";
import type { PalletListResponse } from "../types";

export function useAllPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", "all"],
    queryFn: ({ signal }) => getAllPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
