import { useQuery } from "@tanstack/react-query";
import { getPalletById } from "@/modules/pallets/api/services/queries/getPalletById";
import type { PalletResponse } from "@/modules/pallets/api/types";

export function usePalletByIdQuery(id?: string, enabled = true) {
  return useQuery<PalletResponse>({
    queryKey: ["pallet", { id }],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("id is required");
      return getPalletById(id, signal);
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
