import type { AxiosInstance } from "axios";

export const createDeleteAskByIdService = (apiClient: AxiosInstance) => {
  return async (id: string): Promise<void> => {
    await apiClient.delete(`/asks/${id}`);
  };
};
