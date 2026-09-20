import { apiClient } from "@/lib/apiClient";
import type {
  PatchSkuSliceBodyDto,
  PatchSkuSliceResponseDto,
} from "@/modules/skus/api/types";

export const patchSkuSlice = async (
  skuId: string,
  body: PatchSkuSliceBodyDto,
  signal?: AbortSignal,
): Promise<PatchSkuSliceResponseDto> => {
  const res = await apiClient.patch<PatchSkuSliceResponseDto>(
    `sku-slices/sku/${skuId}`,
    body,
    { signal },
  );
  return res.data;
};
