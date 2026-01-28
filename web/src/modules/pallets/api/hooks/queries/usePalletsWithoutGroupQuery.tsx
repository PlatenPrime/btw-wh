import { getAllPallets } from "@/modules/pallets/api/services/queries/getAllPallets";
import type { PalletListResponse } from "@/modules/pallets/api/types";
import { useQuery } from "@tanstack/react-query";

/**
 * Палети без групи: sector === \"0\" або відсутній, без додаткових фільтрів.
 * Фільтрація виконується на клієнті на основі всіх палет.
 */
export function usePalletsWithoutGroupQuery(enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", { option: "without-group" }],
    queryFn: async ({ signal }) => {
      const all = await getAllPallets(signal);
      return all.filter((pallet) => !pallet.sector || pallet.sector === "0");
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
