import { apiClient } from "@/lib/apiClient";
import type {
  FillAirClientSkugrPageParams,
  FillAirClientSkugrPageResponseDto,
} from "@/modules/skugrs/api/types";

/** POST /api/skugrs/client/air/id/:id/fill-page — одна сторінка Air-лістингу. */
export async function fillAirClientSkugrPage({
  skugrId,
  body,
  signal,
}: FillAirClientSkugrPageParams): Promise<FillAirClientSkugrPageResponseDto> {
  const res = await apiClient.post<FillAirClientSkugrPageResponseDto>(
    `/skugrs/client/air/id/${skugrId}/fill-page`,
    body,
    { signal },
  );
  return res.data;
}
