import { useDebounce } from "@/hooks/useDebounce";
import { getAnalogsByProd } from "@/modules/analogs/api/services/queries/getAnalogsByProd";
import type { GetAnalogsByProdParams } from "@/modules/analogs/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseAnalogsByProdQueryParams extends GetAnalogsByProdParams {
  enabled?: boolean;
}

export function useAnalogsByProdQuery(
  prodName: string,
  {
    page,
    limit,
    search = "",
    signal,
    enabled = true,
  }: UseAnalogsByProdQueryParams,
) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: [
      "analogs",
      "byProd",
      prodName,
      { page, limit, search: debouncedSearch },
    ],
    queryFn: ({ signal: querySignal }) =>
      getAnalogsByProd(prodName, {
        page,
        limit,
        search: debouncedSearch,
        signal: signal ?? querySignal,
      }),
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(prodName),
    staleTime: 5 * 60 * 1000,
  });
}
