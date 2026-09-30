import { ApiTaskCard } from "@/modules/apitasks/components/cards/api-task-card";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import { typography } from "@/lib/typography";
import { ListTodo } from "lucide-react";

interface ApiTasksListContainerViewProps {
  tasks: ApiTaskDto[];
}

export function ApiTasksListContainerView({
  tasks,
}: ApiTasksListContainerViewProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-card/40 px-6 py-16 text-center">
        <ListTodo className="text-muted-foreground size-8" />
        <div className="flex flex-col gap-1">
          <p className={typography.sectionTitle}>Немає задач</p>
          <p className={typography.pageDescription}>
            Запустіть довгу операцію з будь-якого екрана — задача зʼявиться тут
            із загальним статусом. Деталі відкриються на окремій сторінці.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {tasks.map((task) => (
        <ApiTaskCard key={task.taskId} task={task} />
      ))}
    </div>
  );
}
