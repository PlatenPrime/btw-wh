import { apiClient } from "@/lib/apiClient";
import type { DeleteSkugrResponse } from "@/modules/skugrs/api/types";

export const deleteSkugr = async (id: string): Promise<DeleteSkugrResponse> => {
  const res = await apiClient.delete<DeleteSkugrResponse>(`/skugrs/id/${id}`);
  return res.data;
};
