import { listApiTasks } from "@/modules/apitasks/api/services";
import { apitasksQueryKeys } from "@/modules/apitasks/api/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseApiTasksListQueryParams {
  enabled?: boolean;
}

export function useApiTasksListQuery({
  enabled = true,
}: UseApiTasksListQueryParams = {}) {
  return useQuery({
    queryKey: apitasksQueryKeys.all,
    queryFn: () => listApiTasks(),
    enabled,
  });
}
