import { useQuery } from "@tanstack/react-query";
import type { IPos } from "../types";
import { getPosesByPalletId } from "./index";

export function usePosesByPalletQuery(palletId?: string, enabled = true) {
  return useQuery<IPos[]>({
    queryKey: ["poses", { palletId }],
    queryFn: ({ signal }) => {
      if (!palletId) throw new Error("palletId is required");
      return getPosesByPalletId(palletId, signal);
    },
    enabled: !!palletId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
