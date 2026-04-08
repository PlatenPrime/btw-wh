import { getSkusBySkugr } from "@/modules/skus/api/services/queries/getSkusBySkugr";
import type { GetSkusBySkugrParams, SkusResponseDto } from "@/modules/skus/api/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";

export interface UseSkusBySkugrQueryParams
  extends Omit<GetSkusBySkugrParams, "skugrId" | "signal"> {
  skugrId: string;
  enabled?: boolean;
}

export function useSkusBySkugrQuery({
  skugrId,
  page,
  limit,
  search,
  enabled = true,
}: UseSkusBySkugrQueryParams) {
  const queryClient = useQueryClient();
  // Keep debounce in query layer so every consumer gets stable request rate.
  const debouncedSearch = useDebounce(search ?? "", 500);

  const queryKey = [
    "skusBySkugr",
    {
      skugrId,
      page,
      limit,
      search: debouncedSearch,
    },
  ] as const;

  return useQuery<SkusResponseDto, Error, SkusResponseDto, typeof queryKey>({
    queryKey,
    queryFn: ({ signal: querySignal }) =>
      getSkusBySkugr({
        skugrId,
        page,
        limit,
        search: debouncedSearch || undefined,
        signal: querySignal,
      }),
    placeholderData: (): SkusResponseDto | undefined => {
      if (page <= 1) return undefined;
      return queryClient.getQueryData<SkusResponseDto>([
        "skusBySkugr",
        {
          skugrId,
          page: page - 1,
          limit,
          search: debouncedSearch,
        },
      ]);
    },
    enabled: enabled && Boolean(skugrId),
    staleTime: 5 * 60 * 1000,
  });
}
