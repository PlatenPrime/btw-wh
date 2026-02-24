import { apiClient } from "@/lib/apiClient";
import type { ConstantResponse } from "@/modules/constants/api/types";

export const getConstantById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<ConstantResponse> => {
  const res = await apiClient.get<ConstantResponse>(`/constants/id/${id}`, {
    signal,
  });
  return res.data;
};
