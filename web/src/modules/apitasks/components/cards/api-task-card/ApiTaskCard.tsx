import { useApiTasks } from "@/modules/apitasks/providers/api-tasks-provider";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import { useCallback, useState } from "react";
import { ApiTaskCardView } from "./ApiTaskCardView";

interface ApiTaskCardProps {
  task: ApiTaskDto;
}

export function ApiTaskCard({ task }: ApiTaskCardProps) {
  const { cancelTask } = useApiTasks();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = useCallback(async () => {
    setIsCancelling(true);
    try {
      await cancelTask(task.taskId);
    } finally {
      setIsCancelling(false);
    }
  }, [cancelTask, task.taskId]);

  return (
    <ApiTaskCardView
      task={task}
      onCancel={handleCancel}
      isCancelling={isCancelling}
    />
  );
}
