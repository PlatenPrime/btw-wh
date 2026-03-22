import { apiClient } from "@/lib/apiClient";
import type {
  SkugrResponseDto,
  UpdateSkugrDto,
} from "@/modules/skugrs/api/types";

export const updateSkugr = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateSkugrDto;
}): Promise<SkugrResponseDto> => {
  const res = await apiClient.patch<SkugrResponseDto>(
    `/skugrs/id/${id}`,
    data,
  );
  return res.data;
};
