import { getSkuSlicePage } from "@/modules/sku-slices/api/services/queries/getSkuSlicePage";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuSlicePageQueryParams {
  konkName: string;
  date: string;
  page: number;
  limit: number;
}

export function useSkuSlicePageQuery({
  konkName,
  date,
  page,
  limit,
}: UseSkuSlicePageQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "list", konkName, date, page, limit],
    queryFn: ({ signal }) =>
      getSkuSlicePage({ konkName, date, page, limit, signal }),
    enabled: Boolean(konkName && date),
    staleTime: 2 * 60 * 1000,
  });
}
