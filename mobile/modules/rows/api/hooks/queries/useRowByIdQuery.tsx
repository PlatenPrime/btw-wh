import { getRowById } from "@/modules/rows/api/services/queries/getRowById";
import type { RowResponse } from "@/modules/rows/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useRowByIdQuery(rowId?: string) {
  return useQuery<RowResponse>({
    queryKey: ["row", { rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("Row ID is missing");
      return getRowById(rowId, signal);
    },
    enabled: !!rowId,
    staleTime: 5 * 60 * 1000,
  });
}

