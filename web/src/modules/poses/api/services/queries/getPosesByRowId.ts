import { apiClient } from "@/lib/apiClient";
import type { IPos } from "@/modules/poses/api/types";

export const getPosesByRowId = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const res = await apiClient.get<IPos[]>(`/poses/by-row/${rowId}`, { signal });
  return res.data;
}; 