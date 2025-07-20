import { useQuery } from "@tanstack/react-query";
import type { PosListResponse } from "../types";
import { getAllPoses } from "./index";

export function useAllPosesQuery(
  params: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>,
  enabled = true,
) {
  return useQuery<PosListResponse>({
    queryKey: ["poses", params],
    queryFn: ({ signal }) => getAllPoses(params, signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
