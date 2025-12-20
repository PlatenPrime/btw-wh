import { useQuery } from "@tanstack/react-query";
import { getPalletById } from "@/modules/pallets/api/services/queries/getPalletById";
import type { PalletResponse } from "@/modules/pallets/api/types";

export function usePalletByIdQuery(palletId?: string) {
  return useQuery<PalletResponse>({
    queryKey: ["pallet", { palletId }],
    queryFn: ({ signal }) => {
      if (!palletId) throw new Error("Pallet ID is missing");
      return getPalletById(palletId, signal);
    },
    enabled: !!palletId,
    staleTime: 5 * 60 * 1000,
  });
}

