import { useDebounce } from "@/hooks/useDebounce";
import { getAnalogsByKonk } from "@/modules/analogs/api/services/queries/getAnalogsByKonk";
import type { GetAnalogsByKonkParams } from "@/modules/analogs/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseAnalogsByKonkQueryParams extends GetAnalogsByKonkParams {
  enabled?: boolean;
}

export function useAnalogsByKonkQuery(
  konkName: string,
  {
    page,
    limit,
    search = "",
    signal,
    enabled = true,
  }: UseAnalogsByKonkQueryParams,
) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery({
    queryKey: [
      "analogs",
      "byKonk",
      konkName,
      { page, limit, search: debouncedSearch },
    ],
    queryFn: ({ signal: querySignal }) =>
      getAnalogsByKonk(konkName, {
        page,
        limit,
        search: debouncedSearch,
        signal: signal ?? querySignal,
      }),
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(konkName),
    staleTime: 5 * 60 * 1000,
  });
}
