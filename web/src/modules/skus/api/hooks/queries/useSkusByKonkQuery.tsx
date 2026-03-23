import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
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

  const queryKey = [
    "skusByKonk",
    {
      konkName,
      page,
      limit,
      prodName: prodName ?? "",
      search: search ?? "",
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
        search,
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
          search: search ?? "",
        },
      ]);
    },
    enabled: enabled && Boolean(konkName),
    staleTime: 5 * 60 * 1000,
  });
}
