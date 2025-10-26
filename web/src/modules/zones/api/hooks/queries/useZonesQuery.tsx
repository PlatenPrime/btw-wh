import { useDebounce } from "@/hooks/useDebounce";
import { getZones } from "@/modules/zones/api/services/queries/getZones";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseZonesQueryParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: "title" | "bar" | "sector" | "createdAt";
  sortOrder?: "asc" | "desc";
  enabled?: boolean;
}

export function useZonesQuery({
  page,
  limit,
  search = "",
  sortBy = "sector",
  sortOrder = "asc",
  enabled = true,
}: UseZonesQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: ["zones", { page, limit, search: debouncedSearch, sortBy, sortOrder }],
    queryFn: ({ signal }) =>
      getZones({
        page,
        limit,
        search: debouncedSearch,
        sortBy,
        sortOrder,
        signal,
      }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}



