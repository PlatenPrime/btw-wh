import { apiClient } from "@/lib/apiClient";
import type {
  CorrectBandSpikeBodyDto,
  CorrectBandSpikeResponseDto,
} from "@/modules/skus/api/types";

export const correctBandSpike = async (
  skuId: string,
  body: CorrectBandSpikeBodyDto,
  signal?: AbortSignal,
): Promise<CorrectBandSpikeResponseDto> => {
  const res = await apiClient.post<CorrectBandSpikeResponseDto>(
    `sku-slices/sku/${skuId}/correct-band-spike`,
    body,
    { signal },
  );
  return res.data;
};
