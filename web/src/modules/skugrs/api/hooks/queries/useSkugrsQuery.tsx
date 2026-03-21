import { useDebounce } from "@/hooks/useDebounce";
import { getSkugrs } from "@/modules/skugrs/api/services/queries/getSkugrs";
import type { GetSkugrsParams } from "@/modules/skugrs/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkugrsQueryParams extends GetSkugrsParams {
  enabled?: boolean;
}

export function useSkugrsQuery({
  page,
  limit,
  konkName = "",
  prodName = "",
  search = "",
  signal,
  enabled = true,
}: UseSkugrsQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: [
      "skugrs",
      { page, limit, konkName, prodName, search: debouncedSearch },
    ],
    queryFn: ({ signal: querySignal }) =>
      getSkugrs({
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
