import { useQuery } from "@tanstack/react-query";
import { getPalletByTitle } from "@/modules/pallets/api/services/queries/getPalletByTitle";
import type { PalletResponse } from "@/modules/pallets/api/types";

export function usePalletByTitleQuery(palletTitle?: string) {
  return useQuery<PalletResponse>({
    queryKey: ["pallet", { palletTitle }],
    queryFn: ({ signal }) => {
      if (!palletTitle) throw new Error("Pallet title is missing");
      return getPalletByTitle(palletTitle, signal);
    },
    enabled: !!palletTitle,
    staleTime: 5 * 60 * 1000,
  });
}

