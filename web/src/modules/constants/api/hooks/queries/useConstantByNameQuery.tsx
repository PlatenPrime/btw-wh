import { getConstantByName } from "@/modules/constants/api/services/queries/getConstantByName";
import type { ConstantResponse } from "@/modules/constants/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseConstantByNameQueryParams {
  name: string;
  enabled?: boolean;
}

export function useConstantByNameQuery({
  name,
  enabled = true,
}: UseConstantByNameQueryParams) {
  return useQuery<ConstantResponse>({
    queryKey: ["constants", "name", name],
    queryFn: ({ signal }) => getConstantByName({ name, signal }),
    enabled: enabled && !!name,
    staleTime: 5 * 60 * 1000,
  });
}
