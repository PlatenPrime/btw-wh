import { apiClient } from "@/lib/apiClient";
import type { DeleteSkugrWithSkusResponseDto } from "@/modules/skugrs/api/types";

export const deleteSkugrWithSkus = async (
  id: string,
  signal?: AbortSignal,
): Promise<DeleteSkugrWithSkusResponseDto> => {
  const res = await apiClient.delete<DeleteSkugrWithSkusResponseDto>(
    `skugrs/id/${id}/with-skus`,
    { signal },
  );
  return res.data;
};
