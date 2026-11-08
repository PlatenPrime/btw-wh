import { apiClient } from "@/lib/apiClient";
import type {
  DiscoverStockBandParams,
  DiscoverStockBandResponseDto,
} from "@/modules/sku-stock-bands/api/types";

export const discoverStockBand = async ({
  bandId,
  dateFrom,
  dateTo,
  signal,
}: DiscoverStockBandParams): Promise<DiscoverStockBandResponseDto> => {
  const res = await apiClient.post<DiscoverStockBandResponseDto>(
    `sku-slices/stock-bands/${bandId}/discover`,
    { dateFrom, dateTo },
    { signal },
  );
  return res.data;
};
