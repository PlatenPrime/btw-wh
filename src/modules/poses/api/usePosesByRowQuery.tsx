import { useQuery } from "@tanstack/react-query";
import type { IPos } from "../types";
import { getPosesByRowId } from "./index";

export function usePosesByRowQuery(rowId?: string, enabled = true) {
  return useQuery<IPos[]>({
    queryKey: ["poses", { rowId }],
    queryFn: ({ signal }) => {
      if (!rowId) throw new Error("rowId is required");
      return getPosesByRowId(rowId, signal);
    },
    enabled: !!rowId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
