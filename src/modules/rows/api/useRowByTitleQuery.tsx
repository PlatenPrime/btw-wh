import { getRowByTitle } from "@/modules/rows/api/getRowByTitle";
import type { RowDto } from "@/modules/rows/types/dto";
import { useQuery } from "@tanstack/react-query";

export function useRowByTitleQuery(rowTitle?: string) {
  return useQuery<RowDto>({
    queryKey: ["row", { rowTitle }],
    queryFn: ({ signal }) => {
      if (!rowTitle) throw new Error("Row title is missing in URL");
      return getRowByTitle(rowTitle, signal);
    },
    enabled: !!rowTitle,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
