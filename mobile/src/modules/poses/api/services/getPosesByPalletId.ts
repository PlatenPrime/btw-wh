import { apiClient } from '../../../../lib/apiClient';
import type { PosListResponse } from '../types/index';

export const getPosesByPalletId = async (
  palletId: string,
  signal?: AbortSignal
): Promise<PosListResponse> => {
  const res = await apiClient.get<PosListResponse>(`/poses?palletId=${palletId}`, { signal });
  return res.data;
};
