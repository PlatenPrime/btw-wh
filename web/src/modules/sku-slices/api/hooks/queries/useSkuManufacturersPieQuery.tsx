import { getSkuManufacturersPieData } from "@/modules/sku-slices/api/services/queries/getSkuManufacturersPieData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuManufacturersPieQueryParams {
  konk: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuManufacturersPieQuery({
  konk,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuManufacturersPieQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "manufacturers-pie", konk, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkuManufacturersPieData(konk, dateFrom, dateTo, signal),
    enabled: !!konk && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
