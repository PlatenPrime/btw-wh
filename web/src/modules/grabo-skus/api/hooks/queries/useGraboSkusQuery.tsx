import { useDebounce } from "@/hooks/useDebounce";
import { getGraboSkus } from "@/modules/grabo-skus/api/services/queries/getGraboSkus";
import type {
  GetGraboSkusParams,
  GraboSkusResponseDto,
} from "@/modules/grabo-skus/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseGraboSkusQueryParams {
  page: number;
  limit: number;
  search?: string;
  color?: string;
  size?: string;
  material?: string;
  gas?: string;
  language?: string;
  isOnSite?: boolean;
  isNewProduct?: boolean;
  enabled?: boolean;
}

export function useGraboSkusQuery({
  page,
  limit,
  search = "",
  color,
  size,
  material,
  gas,
  language,
  isOnSite,
  isNewProduct,
  enabled = true,
}: UseGraboSkusQueryParams) {
  const debouncedSearch = useDebounce(search, 500);

  const request: GetGraboSkusParams = {
    page,
    limit,
    search: debouncedSearch.trim() || undefined,
    color: color?.trim() || undefined,
    size: size?.trim() || undefined,
    material: material?.trim() || undefined,
    gas: gas?.trim() || undefined,
    language: language?.trim() || undefined,
    isOnSite,
    isNewProduct,
  };

  return useQuery<GraboSkusResponseDto>({
    queryKey: [
      "graboSkus",
      {
        page,
        limit,
        search: debouncedSearch,
        color: color ?? "",
        size: size ?? "",
        material: material ?? "",
        gas: gas ?? "",
        language: language ?? "",
        isOnSite,
        isNewProduct,
      },
    ],
    queryFn: ({ signal }) => getGraboSkus({ ...request, signal }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
