import { getRoles } from "@/modules/auth/api/services/queries/getRoles";
import type { Role } from "@/modules/auth/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseRolesQueryParams {
  enabled?: boolean;
}

export function useRolesQuery({ enabled = true }: UseRolesQueryParams = {}) {
  return useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: ({ signal }) => getRoles(signal),
    enabled,
    staleTime: 10 * 60 * 1000,
  });
}
