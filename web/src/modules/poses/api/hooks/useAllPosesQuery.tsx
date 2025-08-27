import { useQuery } from "@tanstack/react-query";
import { getAllPoses } from "../services/getAllPoses";

export function useAllPosesQuery(
  params: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>,
) {
  return useQuery({
    queryKey: ["poses", params],
    queryFn: ({ signal }) => getAllPoses(params, signal),
  });
} 