import { getSkuSlicePage } from "@/modules/sku-slices/api/services/queries/getSkuSlicePage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuSlicePageQueryParams {
  konkName: string;
  date: string;
  page: number;
  limit: number;
  showInvalidOnly?: boolean;
}

export function useSkuSlicePageQuery({
  konkName,
  date,
  page,
  limit,
  showInvalidOnly,
}: UseSkuSlicePageQueryParams) {
  return useQuery({
    queryKey: [
      "sku-slices",
      "list",
      konkName,
      date,
      page,
      limit,
      Boolean(showInvalidOnly),
    ],
    queryFn: ({ signal }) =>
      getSkuSlicePage({
        konkName,
        date,
        page,
        limit,
        showInvalidOnly,
        signal,
      }),
    enabled: Boolean(konkName && date),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
