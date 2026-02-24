import { getConstants } from "@/modules/constants/api/services/queries/getConstants";
import { useQuery } from "@tanstack/react-query";

export interface UseConstantsQueryParams {
  enabled?: boolean;
}

export function useConstantsQuery({ enabled = true }: UseConstantsQueryParams = {}) {
  return useQuery({
    queryKey: ["constants"],
    queryFn: ({ signal }) => getConstants(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
