// hooks/useArtsQuery.ts
import type { ArtResponseData } from "@/components/modules/arts/types/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getArts } from "../services/arts";

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
  const debouncedSearch = useDebounce(search, 600);

  return useQuery<ArtResponseData>({
    queryKey: ["arts", { page, limit, search: debouncedSearch, ...filters }],
    queryFn: ({ signal }) =>
      getArts({ page, limit, search: debouncedSearch, filters, signal }),
    placeholderData: (prev) => prev,
    enabled,
    staleTime: 180_000,
  });
}
