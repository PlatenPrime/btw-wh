import { apiClient } from "@/lib/apiClient";
import type { Role } from "@/modules/auth/api/types";

export async function getRoles(signal?: AbortSignal): Promise<Role[]> {
  const res = await apiClient.get<Role[]>("/auth/roles", { signal });
  return res.data;
}
