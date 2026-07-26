import { getSkuStock } from "@/modules/skus/api/services/queries/getSkuStock";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuStockQueryParams {
  id: string | undefined;
  /** Live-scrape дорогий — вмикається лише за явним запитом (кнопка). */
  enabled?: boolean;
}

export function useSkuStockQuery({
  id,
  enabled = false,
}: UseSkuStockQueryParams) {
  return useQuery({
    queryKey: ["skus", "id", id, "stock"],
    queryFn: ({ signal }) => getSkuStock(id!, signal),
    enabled: !!id && enabled,
    // Кожен виклик — окремий scrape; не тримаємо як свіже, не рефетчимо у фоні.
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
