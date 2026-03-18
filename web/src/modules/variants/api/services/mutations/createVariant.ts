import { apiClient } from "@/lib/apiClient";
import type {
  CreateVariantDto,
  VariantResponseDto,
} from "@/modules/variants/api/types";

export const createVariant = async (
  data: CreateVariantDto,
): Promise<VariantResponseDto> => {
  const res = await apiClient.post<VariantResponseDto>("/variants", data);
  return res.data;
};

