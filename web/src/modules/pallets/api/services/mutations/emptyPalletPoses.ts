import { apiClient } from "@/lib/apiClient";

export const deletePalletEmptyPoses = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(
    `/pallets/${id}/empty-poses`,
    { signal },
  );
  return res.data;
};
