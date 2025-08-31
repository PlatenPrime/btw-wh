import { apiClient } from "@/lib/apiClient";

export const deleteAskById = async (id: string): Promise<void> => {
  await apiClient.delete(`/asks/${id}`);
};
