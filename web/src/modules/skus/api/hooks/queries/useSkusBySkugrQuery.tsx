import { getSkusBySkugr } from "@/modules/skus/api/services/queries/getSkusBySkugr";
import type { GetSkusBySkugrParams, SkusResponseDto } from "@/modules/skus/api/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  const queryKey = [
    "skusBySkugr",
    {
      skugrId,
      page,
      limit,
      search: search ?? "",
    },
  ] as const;

  return useQuery<SkusResponseDto, Error, SkusResponseDto, typeof queryKey>({
    queryKey,
    queryFn: ({ signal: querySignal }) =>
      getSkusBySkugr({
        skugrId,
        page,
        limit,
        search,
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
          search: search ?? "",
        },
      ]);
    },
    enabled: enabled && Boolean(skugrId),
    staleTime: 5 * 60 * 1000,
  });
}
