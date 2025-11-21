import { useDebounce } from "@/hooks/useDebounce";
import { getZones } from "@/modules/zones/api/services/queries/getZones";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export interface UseZonesInfiniteQueryParams {
  limit: number;
  search?: string;
  enabled?: boolean;
}

export function useZonesInfiniteQuery({
  limit,
  search = "",
  enabled = true,
}: UseZonesInfiniteQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useInfiniteQuery({
    queryKey: ["zones-infinite", { limit, search: debouncedSearch }],
    queryFn: ({ pageParam = 1, signal }) =>
      getZones({
        page: pageParam,
        limit,
        search: debouncedSearch,
        sortBy: "title",
        sortOrder: "asc",
        signal,
      }),
    getNextPageParam: (result) => {
      const nextPage = result.pagination.page + 1;
      return nextPage <= result.pagination.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

