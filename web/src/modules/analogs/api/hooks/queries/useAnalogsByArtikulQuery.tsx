import { getAnalogsByArtikul } from "@/modules/analogs/api/services/queries/getAnalogsByArtikul";
import { useQuery } from "@tanstack/react-query";

export interface UseAnalogsByArtikulQueryParams {
  enabled?: boolean;
}

export function useAnalogsByArtikulQuery(
  artikul: string,
  { enabled = true }: UseAnalogsByArtikulQueryParams = {},
) {
  return useQuery({
    queryKey: ["analogs", "byArtikul", artikul],
    queryFn: ({ signal }) => getAnalogsByArtikul(artikul, { signal }),
    enabled: enabled && Boolean(artikul),
    staleTime: 5 * 60 * 1000,
  });
}
