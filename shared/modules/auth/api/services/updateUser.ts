import type { AxiosInstance } from "axios";
import type { UpdateUserData, User } from "../types";

/**
 * Update user service
 * Требует инициализированный apiClient
 */
export const createUpdateUserService = (apiClient: AxiosInstance) => {
  return async (data: UpdateUserData): Promise<User> => {
    const res = await apiClient.patch<User>("/auth/me", data);
    return res.data;
  };
};
