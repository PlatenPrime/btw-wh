import { useQuery } from "@tanstack/react-query";
import type { PosResponse } from "../types";
import { getPosById } from "./index";

export function usePosByIdQuery(id?: string, enabled = true) {
  return useQuery<PosResponse>({
    queryKey: ["pos", { id }],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("id is required");
      return getPosById(id, signal);
    },
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
}
