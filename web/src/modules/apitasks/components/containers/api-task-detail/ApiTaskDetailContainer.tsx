import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import { useApiTasks } from "@/modules/apitasks/providers/api-tasks-provider";
import { useCallback, useState } from "react";
import { ApiTaskDetailContainerView } from "./ApiTaskDetailContainerView";

interface ApiTaskDetailContainerProps {
  task: ApiTaskDto;
}

export function ApiTaskDetailContainer({ task }: ApiTaskDetailContainerProps) {
  const { tasks, cancelTask, retryTask, startTask } = useApiTasks();
  const [isCancelling, setIsCancelling] = useState(false);

  const tracked = tasks.find((item) => item.task.taskId === task.taskId);
  const canRetry = task.status === "failed";

  const handleCancel = useCallback(async () => {
    setIsCancelling(true);
    try {
      await cancelTask(task.taskId);
    } finally {
      setIsCancelling(false);
    }
  }, [cancelTask, task.taskId]);

  const handleRetry = useCallback(() => {
    if (tracked) {
      void retryTask(task.taskId);
      return;
    }
    void startTask({
      kind: task.kind,
      params: {},
    });
  }, [retryTask, startTask, task.kind, task.taskId, tracked]);

  return (
    <ApiTaskDetailContainerView
      task={task}
      trackedParams={tracked?.params}
      onCancel={handleCancel}
      onRetry={handleRetry}
      isCancelling={isCancelling}
      canRetry={canRetry}
    />
  );
}
