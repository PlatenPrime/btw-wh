import { useDebounce } from "@shared/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GetArtsParams } from "../../services/queries/getArtsByParams";
import type { ArtsDto } from "../../types/dto";

export interface UseArtsQueryParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  enabled?: boolean;
  getArtsByParams: (params: GetArtsParams) => Promise<ArtsDto>;
}

export function useArtsQuery({
  page,
  limit,
  search = "",
  filters = {},
  enabled = true,
  getArtsByParams,
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
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
