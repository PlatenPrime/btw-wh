import { getAnalogStock } from "@/modules/analogs/api/services/queries/getAnalogStock";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogStockQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useAnalogStockQuery({
  id,
  enabled = true,
}: UseAnalogStockQueryParams) {
  return useQuery({
    queryKey: ["analogs", "id", id, "stock"],
    queryFn: ({ signal }) => getAnalogStock(id!, signal),
    enabled: !!id && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
