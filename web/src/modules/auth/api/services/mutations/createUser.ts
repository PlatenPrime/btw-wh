import { apiClient } from "@/lib/apiClient";
import type { RegisterData, User } from "@/modules/auth/api/types";

export interface CreateUserResponse {
  user: User;
}

export async function createUser(
  data: RegisterData,
): Promise<CreateUserResponse> {
  const res = await apiClient.post<CreateUserResponse>("/auth/users", data);
  return res.data;
}
