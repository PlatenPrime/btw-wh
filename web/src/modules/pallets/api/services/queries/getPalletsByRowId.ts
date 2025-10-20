import { apiClient } from "@/lib/apiClient";
import type { PalletShortListResponse } from "@/modules/pallets/api/types";

export const getPalletsByRowId = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<PalletShortListResponse> => {
  const res = await apiClient.get<PalletShortListResponse>(
    `/pallets/by-row/${rowId}`,
    { signal },
  );
  return res.data;
};
