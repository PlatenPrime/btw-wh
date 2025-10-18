import { getPosesByPalletId } from "@/modules/poses/api/services";
import { useQuery } from "@tanstack/react-query";

export function usePosesByPalletQuery(palletId: string) {
  return useQuery({
    queryKey: ["poses", { by: "pallet", palletId }],
    queryFn: ({ signal }) => getPosesByPalletId(palletId, signal),
    enabled: !!palletId,
  });
}
