import { getBtradeSlicePage } from "@/modules/btrade-slices/api/services/queries/getBtradeSlicePage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseBtradeSlicePageQueryParams {
  date: string;
  page: number;
  limit: number;
  showInvalidOnly?: boolean;
}

export function useBtradeSlicePageQuery({
  date,
  page,
  limit,
  showInvalidOnly,
}: UseBtradeSlicePageQueryParams) {
  return useQuery({
    queryKey: [
      "btrade-slices",
      "list",
      date,
      page,
      limit,
      Boolean(showInvalidOnly),
    ],
    queryFn: ({ signal }) =>
      getBtradeSlicePage({
        date,
        page,
        limit,
        showInvalidOnly,
        signal,
      }),
    enabled: Boolean(date),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
