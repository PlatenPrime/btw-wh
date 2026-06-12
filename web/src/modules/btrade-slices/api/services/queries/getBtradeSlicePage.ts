import { apiClient } from "@/lib/apiClient";
import type {
  BtradeSlicePageResponseDto,
  GetBtradeSlicePageParams,
} from "@/modules/btrade-slices/api/types";

export const getBtradeSlicePage = async ({
  date,
  page,
  limit,
  showInvalidOnly,
  signal,
}: GetBtradeSlicePageParams): Promise<BtradeSlicePageResponseDto> => {
  const params = new URLSearchParams({
    date,
    page: String(page),
    limit: String(limit),
  });
  if (showInvalidOnly) {
    params.set("isInvalid", "true");
  }
  const res = await apiClient.get<BtradeSlicePageResponseDto>(
    `btrade-slices?${params.toString()}`,
    { signal },
  );
  return res.data;
};
