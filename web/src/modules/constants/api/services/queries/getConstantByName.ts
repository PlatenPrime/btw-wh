import { apiClient } from "@/lib/apiClient";
import type { ConstantResponse } from "@/modules/constants/api/types";

export const getConstantByName = async ({
  name,
  signal,
}: {
  name: string;
  signal?: AbortSignal;
}): Promise<ConstantResponse> => {
  const res = await apiClient.get<ConstantResponse>(
    `/constants/name/${encodeURIComponent(name)}`,
    { signal },
  );
  return res.data;
};
