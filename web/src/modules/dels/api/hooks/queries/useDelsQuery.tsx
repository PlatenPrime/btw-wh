import { getDels } from "@/modules/dels/api/services/queries/getDels";
import { useQuery } from "@tanstack/react-query";

export interface UseDelsQueryParams {
  enabled?: boolean;
}

export function useDelsQuery({ enabled = true }: UseDelsQueryParams = {}) {
  return useQuery({
    queryKey: ["dels"],
    queryFn: ({ signal }) => getDels(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
