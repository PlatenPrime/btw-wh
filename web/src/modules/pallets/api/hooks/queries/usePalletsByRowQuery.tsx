import { useQuery } from "@tanstack/react-query";
import { getPalletsByRowId } from "@/modules/pallets/api/services/queries/getPalletsByRowId";
import type { PalletShortListResponse } from "@/modules/pallets/api/types";

export function usePalletsByRowQuery(rowId?: string, enabled = true) {
  return useQuery<PalletShortListResponse>({
    queryKey: ["pallets", {by: "row", rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("rowId is required");
      return getPalletsByRowId(rowId, signal);
    },
    enabled: !!rowId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
