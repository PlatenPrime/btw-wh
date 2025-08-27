import { useQuery } from "@tanstack/react-query";
import { getPalletByTitle } from "../services/getPalletByTitle";
import type { PalletResponse } from "../types";

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
