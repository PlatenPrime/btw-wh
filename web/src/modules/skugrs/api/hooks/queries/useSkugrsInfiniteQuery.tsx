import { useDebounce } from "@/hooks/useDebounce";
import { getSkugrs } from "@/modules/skugrs/api/services/queries/getSkugrs";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export interface UseSkugrsInfiniteQueryParams {
  limit: number;
  search?: string;
  konkName?: string;
  prodName?: string;
  isSliced?: boolean;
  enabled?: boolean;
}

export function useSkugrsInfiniteQuery({
  limit,
  search = "",
  konkName = "",
  prodName = "",
  isSliced,
  enabled = true,
}: UseSkugrsInfiniteQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useInfiniteQuery({
    queryKey: [
      "skugrs-infinite",
      { limit, search: debouncedSearch, konkName, prodName, isSliced },
    ],
    queryFn: ({ pageParam = 1, signal }) =>
      getSkugrs({
        page: pageParam,
        limit,
        search: debouncedSearch,
        konkName,
        prodName,
        isSliced,
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
