import { getLatestDefs } from "@/modules/defs/api/services/queries/getLatestDefs";
import { useQuery } from "@tanstack/react-query";

export function useLatestDefsQuery() {
  return useQuery({
    queryKey: ["defs", "latest"],
    queryFn: () => getLatestDefs(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
