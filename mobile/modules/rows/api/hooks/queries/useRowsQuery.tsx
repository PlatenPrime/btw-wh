import type { RowDto } from "@/modules/rows/api/types/dto";
import { useQuery } from "@tanstack/react-query";
import { getRows } from "@/modules/rows/api/services/queries/getRows";

export function useRowsQuery() {
  return useQuery<RowDto[]>({
    queryKey: ["rows"],
    queryFn: ({ signal }) => getRows({ signal }),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}

