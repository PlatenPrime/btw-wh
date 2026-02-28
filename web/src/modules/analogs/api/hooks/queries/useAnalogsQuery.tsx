import { useDebounce } from "@/hooks/useDebounce";
import { getAnalogs } from "@/modules/analogs/api/services/queries/getAnalogs";
import type { GetAnalogsParams } from "@/modules/analogs/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseAnalogsQueryParams extends GetAnalogsParams {
  enabled?: boolean;
}

export function useAnalogsQuery({
  page,
  limit,
  konkName = "",
  prodName = "",
  search = "",
  signal,
  enabled = true,
}: UseAnalogsQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: ["analogs", { page, limit, konkName, prodName, search: debouncedSearch }],
    queryFn: ({ signal: querySignal }) =>
      getAnalogs({
        page,
        limit,
        konkName,
        prodName,
        search: debouncedSearch,
        signal: signal ?? querySignal,
      }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
