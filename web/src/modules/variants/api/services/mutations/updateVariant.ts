import { apiClient } from "@/lib/apiClient";
import type {
  UpdateVariantDto,
  VariantResponseDto,
} from "@/modules/variants/api/types";

export const updateVariant = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateVariantDto;
}): Promise<VariantResponseDto> => {
  const res = await apiClient.patch<VariantResponseDto>(
    `/variants/id/${id}`,
    data,
  );
  return res.data;
};

