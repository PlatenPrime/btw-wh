import type { RowDto } from "@/modules/rows/types/dto";
import {  useQuery } from "@tanstack/react-query";
import { getRows } from "./getRows";

export function useRowsQuery() {
  return useQuery<RowDto[]>({
    queryKey: ["rows"],
    queryFn: ({ signal }) => getRows({ signal }),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}
