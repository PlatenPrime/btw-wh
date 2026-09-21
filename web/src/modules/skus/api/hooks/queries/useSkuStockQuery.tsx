import { getSkuStock } from "@/modules/skus/api/services/queries/getSkuStock";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuStockQueryParams {
  id: string | undefined;
  enabled?: boolean;
}

export function useSkuStockQuery({
  id,
  enabled = true,
}: UseSkuStockQueryParams) {
  return useQuery({
    queryKey: ["skus", "id", id, "stock"],
    queryFn: ({ signal }) => getSkuStock(id!, signal),
    enabled: !!id && enabled,
    // Live-scrape: не рефетчимо у фоні, повтор — лише явне оновлення.
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
