import { getRowById } from "@/modules/rows/api/services/queries/getRowById";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useRowByIdQuery(rowId?: string) {
  return useQuery<RowDto>({
    queryKey: ["row", { rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("Row ID is missing in URL");
      return getRowById(rowId, signal);
    },
    enabled: !!rowId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
