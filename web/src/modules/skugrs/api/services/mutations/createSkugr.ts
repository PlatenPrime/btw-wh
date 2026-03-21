import { apiClient } from "@/lib/apiClient";
import type {
  CreateSkugrDto,
  SkugrResponseDto,
} from "@/modules/skugrs/api/types";

export const createSkugr = async (
  data: CreateSkugrDto,
): Promise<SkugrResponseDto> => {
  const res = await apiClient.post<SkugrResponseDto>("/skugrs", data);
  return res.data;
};
