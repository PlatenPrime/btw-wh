import { useQuery } from "@tanstack/react-query";
import { getPosesByRowId } from "../services/getPosesByRowId";

export function usePosesByRowQuery(rowId: string) {
  return useQuery({
    queryKey: ["poses", "by-row", rowId],
    queryFn: ({ signal }) => getPosesByRowId(rowId, signal),
    enabled: !!rowId,
  });
} 