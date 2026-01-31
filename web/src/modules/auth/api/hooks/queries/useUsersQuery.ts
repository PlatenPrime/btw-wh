import { getUsers } from "@/modules/auth/api/services/queries/getUsers";
import { useQuery } from "@tanstack/react-query";

export interface UseUsersQueryParams {
  enabled?: boolean;
}

export function useUsersQuery({ enabled = true }: UseUsersQueryParams = {}) {
  return useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
