import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getAnalogsByKonk } from "@/modules/analogs/api/services/queries/getAnalogsByKonk";
import type {
  AnalogsResponseDto,
  GetAnalogsByKonkParams,
} from "@/modules/analogs/api/types";
import { useQuery } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 500);

  const queryKey = ["analogsByKonk", { konkName, page, limit, search: debouncedSearch }] as const;

  return useQuery<AnalogsResponseDto, Error, AnalogsResponseDto, typeof queryKey>({
    queryKey,
    queryFn: ({ signal: querySignal }) =>
      getAnalogsByKonk(konkName, {
        page,
        limit,
        search: debouncedSearch,
        signal: signal ?? querySignal,
      }),
    placeholderData: (): AnalogsResponseDto | undefined => {
      if (page <= 1) return undefined;
      return queryClient.getQueryData<AnalogsResponseDto>([
        "analogsByKonk",
        { konkName, page: page - 1, limit, search: debouncedSearch },
      ]);
    },
    enabled: enabled && Boolean(konkName),
    staleTime: 5 * 60 * 1000,
  });
}
