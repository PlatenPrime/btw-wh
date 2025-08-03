import { useQuery } from "@tanstack/react-query";
import { getPosesByPalletId } from "../services/getPosesByPalletId";

export function usePosesByPalletQuery(palletId: string) {
  return useQuery({
    queryKey: ["poses", "by-pallet", palletId],
    queryFn: ({ signal }) => getPosesByPalletId(palletId, signal),
    enabled: !!palletId,
  });
} 