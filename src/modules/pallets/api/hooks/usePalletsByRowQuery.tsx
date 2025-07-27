import { useQuery } from "@tanstack/react-query";
import { getPalletsByRowId } from "../services/getPalletsByRowId";
import type { PalletListResponse } from "../types";

export function usePalletsByRowQuery(rowId?: string, enabled = true) {
  return useQuery<PalletListResponse>({
    queryKey: ["pallets", { rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("rowId is required");
      return getPalletsByRowId(rowId, signal);
    },
    enabled: !!rowId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
