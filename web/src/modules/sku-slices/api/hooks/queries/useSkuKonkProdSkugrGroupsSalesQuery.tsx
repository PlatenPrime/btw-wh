import { getSkuKonkProdSkugrGroupsSalesData } from "@/modules/sku-slices/api/services/queries/getSkuKonkProdSkugrGroupsSalesData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseSkuKonkProdSkugrGroupsSalesQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuKonkProdSkugrGroupsSalesQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuKonkProdSkugrGroupsSalesQueryParams) {
  return useQuery({
    queryKey: [
      "sku-slices",
      "konk-prod-skugr-groups-sales",
      konk,
      prod,
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      getSkuKonkProdSkugrGroupsSalesData(konk, prod, dateFrom, dateTo, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
