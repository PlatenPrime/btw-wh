import { useQuery } from "@tanstack/react-query";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { getPalletByTitle } from "@/modules/pallets/api/services/queries/getPalletByTitle";

export function usePalletByTitleQuery(title?: string, enabled = true) {
  return useQuery<PalletResponse>({
    queryKey: ["pallet", { title }],
    queryFn: ({ signal }) => {
      if (!title) throw new Error("title is required");
      return getPalletByTitle(title, signal);
    },
    enabled: !!title && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
