import { apiClient } from "@/lib/apiClient";
import type {
  RunSkugrSlicesTodayParams,
  RunSkugrSlicesTodayResponseDto,
} from "@/modules/sku-analytics/api/types";

/** Scrape усіх SKU групи за сьогодні може тривати хвилини при великій групі. */
const RUN_SKUGR_SLICES_TODAY_TIMEOUT_MS = 10 * 60 * 1000;

export async function runSkugrSlicesToday({
  skugrId,
  signal,
}: RunSkugrSlicesTodayParams): Promise<RunSkugrSlicesTodayResponseDto> {
  const res = await apiClient.post<RunSkugrSlicesTodayResponseDto>(
    `sku-slices/skugr/${skugrId}/run-today`,
    {},
    {
      signal,
      timeout: RUN_SKUGR_SLICES_TODAY_TIMEOUT_MS,
    },
  );

  return res.data;
}
