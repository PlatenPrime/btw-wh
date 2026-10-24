import { apiClient } from "@/lib/apiClient";
import type {
  DiscoverBandSpikeParams,
  DiscoverBandSpikeResponseDto,
} from "@/modules/sku-analytics/api/types";

export const discoverBandSpike = async ({
  konkName,
  stockMin,
  stockMax,
  dateFrom,
  dateTo,
  signal,
}: DiscoverBandSpikeParams): Promise<DiscoverBandSpikeResponseDto> => {
  const res = await apiClient.post<DiscoverBandSpikeResponseDto>(
    "sku-slices/band-spike/discover",
    { konkName, stockMin, stockMax, dateFrom, dateTo },
    { signal },
  );
  return res.data;
};
