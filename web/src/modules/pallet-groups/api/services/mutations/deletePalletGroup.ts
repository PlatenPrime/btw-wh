import { apiClient } from "@/lib/apiClient";

export const deletePalletGroup = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(
    `/pallet-groups/${id}`,
    { signal },
  );

  return res.data;
};
