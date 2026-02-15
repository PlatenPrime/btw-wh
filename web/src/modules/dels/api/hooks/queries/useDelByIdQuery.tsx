import { getDelById } from "@/modules/dels/api/services/queries/getDelById";
import type { DelResponse } from "@/modules/dels/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseDelByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useDelByIdQuery({
  id,
  enabled = true,
}: UseDelByIdQueryParams) {
  return useQuery<DelResponse>({
    queryKey: ["dels", id],
    queryFn: ({ signal }) => getDelById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
