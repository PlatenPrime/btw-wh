import { getProds } from "@/modules/prods/api/services/queries/getProds";
import { useQuery } from "@tanstack/react-query";

export interface UseProdsQueryParams {
  enabled?: boolean;
}

export function useProdsQuery({ enabled = true }: UseProdsQueryParams = {}) {
  return useQuery({
    queryKey: ["prods"],
    queryFn: ({ signal }) => getProds(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
