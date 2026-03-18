import { useDebounce } from "@/hooks/useDebounce";
import { getVariants } from "@/modules/variants/api/services/queries/getVariants";
import type { GetVariantsParams } from "@/modules/variants/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseVariantsQueryParams extends GetVariantsParams {
  enabled?: boolean;
}

export function useVariantsQuery({
  page,
  limit,
  konkName = "",
  prodName = "",
  search = "",
  signal,
  enabled = true,
}: UseVariantsQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: ["variants", { page, limit, konkName, prodName, search: debouncedSearch }],
    queryFn: ({ signal: querySignal }) =>
      getVariants({
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

