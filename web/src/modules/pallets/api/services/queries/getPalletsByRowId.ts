import { apiClient } from "@/lib/apiClient";
import type { PalletListResponse } from "@/modules/pallets/api/types";

export const getPalletsByRowId = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const res = await apiClient.get<PalletListResponse>(
    `/pallets/by-row/${rowId}`,
    { signal },
  );
  return res.data;
};
