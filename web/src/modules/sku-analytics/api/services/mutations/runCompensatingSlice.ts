import { apiClient } from "@/lib/apiClient";
import type {
  RunCompensatingSliceParams,
  RunCompensatingSliceResponseDto,
} from "@/modules/sku-analytics/api/types";

/** Compensating scrape може тривати хвилини при великій кількості -1/-1. */
const COMPENSATING_SLICE_TIMEOUT_MS = 10 * 60 * 1000;

export async function runCompensatingSlice({
  konkName,
  signal,
}: RunCompensatingSliceParams): Promise<RunCompensatingSliceResponseDto> {
  const res = await apiClient.post<RunCompensatingSliceResponseDto>(
    "/slice-compensation/run",
    { konkName },
    {
      signal,
      timeout: COMPENSATING_SLICE_TIMEOUT_MS,
    },
  );

  return res.data;
}
