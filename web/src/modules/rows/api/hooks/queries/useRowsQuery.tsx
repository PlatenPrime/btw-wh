import { getRows } from "@/modules/rows/api/services";
import type { RowDto } from "@/modules/rows/api/types";
import { useQuery } from "@tanstack/react-query";

export function useRowsQuery() {
  return useQuery<RowDto[]>({
    queryKey: ["rows"],
    queryFn: ({ signal }) => getRows({ signal }),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}
