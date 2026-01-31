import { apiClient } from "@/lib/apiClient";
import type { User } from "@/modules/auth/api/types";

export interface UserByIdResponse {
  user: User;
}

export async function getUserById(
  id: string,
  signal?: AbortSignal,
): Promise<UserByIdResponse> {
  const res = await apiClient.get<UserByIdResponse>(`/auth/users/${id}`, {
    signal,
  });
  return res.data;
}
