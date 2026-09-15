import { apiClient } from "@/lib/apiClient";
import type {
  GetPackFlipsParams,
  PackFlipsResponseDto,
} from "@/modules/sku-analytics/api/types";

export const getPackFlips = async ({
  konkName,
  dateFrom,
  dateTo,
  signal,
}: GetPackFlipsParams): Promise<PackFlipsResponseDto> => {
  const params = new URLSearchParams({
    konkName,
    dateFrom,
    dateTo,
  });
  const res = await apiClient.get<PackFlipsResponseDto>(
    `sku-slices/pack-flips?${params.toString()}`,
    { signal },
  );
  return res.data;
};
