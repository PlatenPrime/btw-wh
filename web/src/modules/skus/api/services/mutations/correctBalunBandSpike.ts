import { apiClient } from "@/lib/apiClient";
import type {
  CorrectBalunBandSpikeBodyDto,
  CorrectBalunBandSpikeResponseDto,
} from "@/modules/skus/api/types";

export const correctBalunBandSpike = async (
  skuId: string,
  body: CorrectBalunBandSpikeBodyDto,
  signal?: AbortSignal,
): Promise<CorrectBalunBandSpikeResponseDto> => {
  const res = await apiClient.post<CorrectBalunBandSpikeResponseDto>(
    `sku-slices/sku/${skuId}/correct-balun-band-spike`,
    body,
    { signal },
  );
  return res.data;
};
