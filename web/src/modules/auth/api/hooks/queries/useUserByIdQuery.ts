import { getUserById } from "@/modules/auth/api/services/queries/getUserById";
import type { UserByIdResponse } from "@/modules/auth/api/services/queries/getUserById";
import { useQuery } from "@tanstack/react-query";

export interface UseUserByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useUserByIdQuery({
  id,
  enabled = true,
}: UseUserByIdQueryParams) {
  return useQuery<UserByIdResponse>({
    queryKey: ["users", id],
    queryFn: ({ signal }) => getUserById(id, signal),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
