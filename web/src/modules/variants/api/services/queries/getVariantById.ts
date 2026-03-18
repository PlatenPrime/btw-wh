import { apiClient } from "@/lib/apiClient";
import type {
  VariantResponseDto,
} from "@/modules/variants/api/types";

export const getVariantById = async (
  id: string,
  signal?: AbortSignal,
): Promise<VariantResponseDto> => {
  const res = await apiClient.get<VariantResponseDto>(
    `/variants/id/${id}`,
    { signal },
  );

  return res.data;
};

