import { useQuery } from "@tanstack/react-query";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";
import { getLatestDefs } from "@/modules/defs/api/services/queries/getLatestDefs";

export function useLatestDefsQuery() {
  return useQuery<GetLatestDefsResponse>({
    queryKey: ["defs", "latest"],
    queryFn: ({ signal }) => getLatestDefs(signal),
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
}
