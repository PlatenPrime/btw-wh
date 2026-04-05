import { useDebounce } from "@/hooks/useDebounce";
import { getSkus } from "@/modules/skus/api/services/queries/getSkus";
import type { GetSkusParams, SkusResponseDto } from "@/modules/skus/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkusCatalogQueryParams {
  page: number;
  limit: number;
  konkName?: string;
  prodName?: string;
  search?: string;
  isInvalid?: boolean;
  createdFrom?: string;
  signal?: AbortSignal;
  enabled?: boolean;
}

export function useSkusCatalogQuery({
  page,
  limit,
  konkName,
  prodName,
  search = "",
  isInvalid,
  createdFrom,
  signal,
  enabled = true,
}: UseSkusCatalogQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  const request: GetSkusParams = {
    page,
    limit,
    konkName: konkName?.trim() || undefined,
    prodName: prodName?.trim() || undefined,
    search: debouncedSearch.trim() || undefined,
    isInvalid,
    createdFrom: createdFrom?.trim() || undefined,
  };

  return useQuery<SkusResponseDto>({
    queryKey: [
      "skusCatalog",
      {
        page,
        limit,
        konkName: konkName ?? "",
        prodName: prodName ?? "",
        search: debouncedSearch,
        isInvalid,
        createdFrom: createdFrom ?? "",
      },
    ],
    queryFn: ({ signal: querySignal }) =>
      getSkus({ ...request, signal: signal ?? querySignal }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}