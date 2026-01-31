import { apiClient } from "@/lib/apiClient";
import type { User } from "@/modules/auth/api/types";

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await apiClient.get<User[]>("/auth/users", { signal });
  return res.data;
}
