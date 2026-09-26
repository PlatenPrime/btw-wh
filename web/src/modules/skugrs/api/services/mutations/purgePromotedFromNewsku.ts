import { apiClient } from "@/lib/apiClient";
import type { PurgePromotedFromNewskuResponseDto } from "@/modules/skugrs/api/types";

export const purgePromotedFromNewsku = async (
  signal?: AbortSignal,
): Promise<PurgePromotedFromNewskuResponseDto> => {
  const res = await apiClient.post<PurgePromotedFromNewskuResponseDto>(
    "skugrs/purge-promoted-from-newsku",
    {},
    { signal },
  );
  return res.data;
};
