import { apiClient } from "@/lib/apiClient";
import type { KaskDto, UpdateKaskDto } from "@/modules/kasks/api/types/dto";

export const updateKask = async (
  id: string,
  data: UpdateKaskDto,
): Promise<KaskDto> => {
  const res = await apiClient.patch<{ message: string; data: KaskDto }>(
    `/kasks/${id}`,
    data,
  );
  return res.data.data;
};
