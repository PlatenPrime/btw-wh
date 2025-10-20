import { useQuery } from '@tanstack/react-query';
import { getPosesByPalletId } from '../services/getPosesByPalletId';
import type { PosListResponse } from '../types';

export const usePosesByPalletQuery = (palletId: string) => {
  return useQuery<PosListResponse>({
    queryKey: ['poses', 'pallet', palletId],
    queryFn: () => getPosesByPalletId(palletId),
    enabled: !!palletId,
  });
};
