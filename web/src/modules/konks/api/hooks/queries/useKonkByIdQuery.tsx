import { getKonkById } from "@/modules/konks/api/services/queries/getKonkById";
import type { KonkResponse } from "@/modules/konks/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseKonkByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useKonkByIdQuery({
  id,
  enabled = true,
}: UseKonkByIdQueryParams) {
  return useQuery<KonkResponse>({
    queryKey: ["konks", id],
    queryFn: ({ signal }) => getKonkById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
