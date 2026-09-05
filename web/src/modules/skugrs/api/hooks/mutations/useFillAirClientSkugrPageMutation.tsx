import { fillAirClientSkugrPage } from "@/modules/skugrs/api/services/mutations/fillAirClientSkugrPage";
import type {
  AirClientApiError,
  FillAirClientSkugrPageParams,
  FillAirClientSkugrPageResponseDto,
} from "@/modules/skugrs/api/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

/**
 * Тонкий враппер POST client/air/id/:id/fill-page.
 * Інвалідацію кешу і тости робить оркестратор після серії сторінок.
 */
export function useFillAirClientSkugrPageMutation() {
  return useMutation<
    FillAirClientSkugrPageResponseDto,
    AxiosError<AirClientApiError>,
    FillAirClientSkugrPageParams
  >({
    mutationFn: (params) => fillAirClientSkugrPage(params),
  });
}
