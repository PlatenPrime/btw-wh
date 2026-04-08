import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getSkus } from "@/modules/skus/api/services/queries/getSkus";
import type { GetSkusParams, SkusResponseDto } from "@/modules/skus/api/types";

export interface UseSkusByKonkQueryParams
  extends Omit<GetSkusParams, "konkName"> {
  enabled?: boolean;
}

export function useSkusByKonkQuery(
  konkName: string,
  {
    page,
    limit,
    prodName,
    search,
    signal,
    enabled = true,
  }: UseSkusByKonkQueryParams,
) {
  const queryClient = useQueryClient();
  // Keep debounce in query layer so every consumer gets stable request rate.
  const debouncedSearch = useDebounce(search ?? "", 500);

  const queryKey = [
    "skusByKonk",
    {
      konkName,
      page,
      limit,
      prodName: prodName ?? "",
      search: debouncedSearch,
    },
  ] as const;

  return useQuery<SkusResponseDto, Error, SkusResponseDto, typeof queryKey>({
    queryKey,
    queryFn: ({ signal: querySignal }) =>
      getSkus({
        page,
        limit,
        konkName,
        prodName,
        search: debouncedSearch || undefined,
        signal: signal ?? querySignal,
      }),
    placeholderData: (): SkusResponseDto | undefined => {
      if (page <= 1) return undefined;
      return queryClient.getQueryData<SkusResponseDto>([
        "skusByKonk",
        {
          konkName,
          page: page - 1,
          limit,
          prodName: prodName ?? "",
          search: debouncedSearch,
        },
      ]);
    },
    enabled: enabled && Boolean(konkName),
    staleTime: 5 * 60 * 1000,
  });
}
