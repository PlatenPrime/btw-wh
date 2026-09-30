import { getApiTask } from "@/modules/apitasks/api/services";
import { apitasksQueryKeys } from "@/modules/apitasks/api/query-keys";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import { useQuery } from "@tanstack/react-query";

interface UseApiTaskByIdQueryParams {
  taskId: string;
  enabled?: boolean;
}

function isActiveStatus(status: ApiTaskDto["status"]): boolean {
  return status === "queued" || status === "running";
}

export function useApiTaskByIdQuery({
  taskId,
  enabled = true,
}: UseApiTaskByIdQueryParams) {
  return useQuery({
    queryKey: apitasksQueryKeys.detail(taskId),
    queryFn: () => getApiTask(taskId),
    enabled: enabled && taskId.length > 0,
    refetchInterval: (query) => {
      const task = query.state.data;
      if (!task || !isActiveStatus(task.status)) return false;
      return task.pollIntervalMs ?? 1000;
    },
  });
}
