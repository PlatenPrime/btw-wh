import { getConstantById } from "@/modules/constants/api/services/queries/getConstantById";
import type { ConstantResponse } from "@/modules/constants/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseConstantByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useConstantByIdQuery({
  id,
  enabled = true,
}: UseConstantByIdQueryParams) {
  return useQuery<ConstantResponse>({
    queryKey: ["constants", id],
    queryFn: ({ signal }) => getConstantById({ id, signal }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
