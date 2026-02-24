import { apiClient } from "@/lib/apiClient";
import type { DeleteConstantResponse } from "@/modules/constants/api/types";

export const deleteConstant = async (
  id: string,
): Promise<DeleteConstantResponse> => {
  const res = await apiClient.delete<DeleteConstantResponse>(
    `/constants/id/${id}`,
  );
  return res.data;
};
