import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getAnalogsByProd } from "@/modules/analogs/api/services/queries/getAnalogsByProd";
import type {
  AnalogsResponseDto,
  GetAnalogsByProdParams,
} from "@/modules/analogs/api/types";
import { useQuery } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 500);

  const queryKey = ["analogsByProd", { prodName, page, limit, search: debouncedSearch }] as const;

  return useQuery<AnalogsResponseDto, Error, AnalogsResponseDto, readonly ["analogsByProd", { readonly prodName: string; readonly page: number; readonly limit: number; readonly search: string }]>({
    queryKey,
    queryFn: ({ signal: querySignal }) =>
      getAnalogsByProd(prodName, {
        page,
        limit,
        search: debouncedSearch,
        signal: signal ?? querySignal,
      }),
    placeholderData: (): AnalogsResponseDto | undefined => {
      if (page <= 1) return undefined;
      return queryClient.getQueryData<AnalogsResponseDto>([
        "analogsByProd",
        { prodName, page: page - 1, limit, search: debouncedSearch },
      ]);
    },
    enabled: enabled && Boolean(prodName),
    staleTime: 5 * 60 * 1000,
  });
}
