import { putAirClientSkuSlice } from "@/modules/sku-analytics/api/services/mutations/putAirClientSkuSlice";
import type {
  PutAirClientSkuSliceParams,
  PutAirClientSkuSliceResponseDto,
} from "@/modules/sku-analytics/api/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface AirClientApiError {
  message: string;
  code?: string;
  errors?: Array<{ path: string[]; message: string }>;
}

/**
 * Тонкий враппер PUT client/air/sku/:skuId.
 * Інвалідацію кешу зрізів і тости робить контейнер-оркестратор після серії,
 * щоб не смикати кеш на кожній позиції.
 */
export function usePutAirClientSkuSliceMutation() {
  return useMutation<
    PutAirClientSkuSliceResponseDto,
    AxiosError<AirClientApiError>,
    PutAirClientSkuSliceParams
  >({
    mutationFn: (params) => putAirClientSkuSlice(params),
  });
}
