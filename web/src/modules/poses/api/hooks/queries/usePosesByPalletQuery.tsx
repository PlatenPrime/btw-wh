import { useQuery } from "@tanstack/react-query";
import { getPosesByPalletId } from "@/modules/poses/api/services/queries/getPosesByPalletId";

export function usePosesByPalletQuery(palletId: string) {
  return useQuery({
    queryKey: ["poses", "by-pallet", palletId],
    queryFn: ({ signal }) => getPosesByPalletId(palletId, signal),
    enabled: !!palletId,
  });
} 