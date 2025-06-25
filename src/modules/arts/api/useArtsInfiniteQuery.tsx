// hooks/useArtsInfiniteQuery.ts
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtsByParams } from "./getArtsByParams";

export interface UseArtsInfiniteQueryParams {
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  enabled?: boolean;
}

export function useArtsInfiniteQuery({
  limit,
  search = "",
  filters = {},
  enabled = true,
}: UseArtsInfiniteQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useInfiniteQuery({
    queryKey: ["arts-infinite", { limit, search: debouncedSearch, ...filters }],
    queryFn: ({ pageParam = 1, signal }) =>
      getArtsByParams({
        page: pageParam,
        limit,
        search: debouncedSearch,
        filters,
        signal,
      }),
    getNextPageParam: (result  ) => {
      const nextPage = result.page + 1;
      return nextPage <= result.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
