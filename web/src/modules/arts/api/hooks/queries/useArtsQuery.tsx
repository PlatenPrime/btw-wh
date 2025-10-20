// hooks/useArtsQuery.ts
import { useDebounce } from "@/hooks/useDebounce";
import { getArtsByParams } from "@/modules/arts/api/services/queries/getArtsByParams";
import type { ArtsDto } from "@/modules/arts/api/types/dto";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseArtsQueryParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  enabled?: boolean;
}

export function useArtsQuery({
  page,
  limit,
  search = "",
  filters = {},
  enabled = true,
}: UseArtsQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery<ArtsDto>({
    queryKey: ["arts", { page, limit, search: debouncedSearch, ...filters }],
    queryFn: ({ signal }) =>
      getArtsByParams({
        page,
        limit,
        search: debouncedSearch,
        filters,
        signal,
      }),
    // placeholderData: (prev) => prev,
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
