import { apiClient } from "@/lib/apiClient";
import type { AdminUpdateUserData, User } from "@/modules/auth/api/types";

export interface UpdateUserAdminResponse {
  user: User;
  token: string;
}

export async function updateUserAdmin(
  userId: string,
  data: AdminUpdateUserData,
): Promise<UpdateUserAdminResponse> {
  const res = await apiClient.put<UpdateUserAdminResponse>(
    `/auth/users/${userId}`,
    data,
  );
  return res.data;
}
