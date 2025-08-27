import { useQuery } from "@tanstack/react-query";
import { getEmptyPallets } from "../services/getEmptyPallets";
import type { PalletListResponse } from "../types";

export function useEmptyPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", {option: "empty" }],
    queryFn: ({ signal }) => getEmptyPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
