import { apiClient } from "@/lib/apiClient";

export const deletePalletPoses = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(
    `/pallets/${id}/poses`,
    { signal },
  );
  return res.data;
};
