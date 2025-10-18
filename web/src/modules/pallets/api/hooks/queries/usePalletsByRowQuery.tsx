import { getPalletsByRowId } from "@/modules/pallets/api/services";
import type { PalletShortListResponse } from "@/modules/pallets/api/types";
import { useQuery } from "@tanstack/react-query";

export function usePalletsByRowQuery(rowId?: string, enabled = true) {
  return useQuery<PalletShortListResponse>({
    queryKey: ["pallets", { rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("rowId is required");
      return getPalletsByRowId(rowId, signal);
    },
    enabled: !!rowId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
