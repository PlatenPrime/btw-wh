import { getPosesByRowId } from "@/modules/poses/api/services";
import { useQuery } from "@tanstack/react-query";

export function usePosesByRowQuery(rowId: string) {
  return useQuery({
    queryKey: ["poses", { by: "row", rowId }],
    queryFn: ({ signal }) => getPosesByRowId(rowId, signal),
    enabled: !!rowId,
  });
}
