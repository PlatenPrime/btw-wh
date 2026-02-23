import { getKonks } from "@/modules/konks/api/services/queries/getKonks";
import { useQuery } from "@tanstack/react-query";

export interface UseKonksQueryParams {
  enabled?: boolean;
}

export function useKonksQuery({ enabled = true }: UseKonksQueryParams = {}) {
  return useQuery({
    queryKey: ["konks"],
    queryFn: ({ signal }) => getKonks(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
