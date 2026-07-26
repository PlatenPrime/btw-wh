import { apiClient } from "@/lib/apiClient";
import type {
  PutAirClientSkuSliceParams,
  PutAirClientSkuSliceResponseDto,
} from "@/modules/sku-analytics/api/types";

/** PUT /api/sku-slices/client/air/sku/:skuId — ідемпотентний запис точки Air-зрізу з HTML. */
export async function putAirClientSkuSlice({
  skuId,
  body,
  signal,
}: PutAirClientSkuSliceParams): Promise<PutAirClientSkuSliceResponseDto> {
  const res = await apiClient.put<PutAirClientSkuSliceResponseDto>(
    `sku-slices/client/air/sku/${skuId}`,
    body,
    { signal },
  );
  return res.data;
}
