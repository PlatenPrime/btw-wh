import { getAllPoses } from "@/modules/poses/api/services";
import { useQuery } from "@tanstack/react-query";

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
