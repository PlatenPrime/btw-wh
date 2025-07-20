import { useQuery } from "@tanstack/react-query";
import type { PalletListResponse } from "../types";
import { getAllPallets } from "./index";

export function useAllPalletsQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", "all"],
    queryFn: ({ signal }) => getAllPallets(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
