import { getProdById } from "@/modules/prods/api/services/queries/getProdById";
import type { ProdResponse } from "@/modules/prods/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseProdByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useProdByIdQuery({
  id,
  enabled = true,
}: UseProdByIdQueryParams) {
  return useQuery<ProdResponse>({
    queryKey: ["prods", id],
    queryFn: ({ signal }) => getProdById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
