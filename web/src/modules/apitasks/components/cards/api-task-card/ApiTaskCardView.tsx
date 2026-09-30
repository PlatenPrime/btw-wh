import { ListRowCard } from "@/components/shared/cards";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";
import { getApiTaskKindLabel, getApiTaskStatusLabel } from "@/modules/apitasks/utils/labels";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

interface ApiTaskCardViewProps {
  task: ApiTaskDto;
  onCancel: () => void;
  isCancelling?: boolean;
}

export function ApiTaskCardView({
  task,
  onCancel,
  isCancelling = false,
}: ApiTaskCardViewProps) {
  const title = getApiTaskKindLabel(task.kind);
  const statusLabel = getApiTaskStatusLabel({
    status: task.status,
    phase: task.phase,
    progress: task.progress,
    queuePosition: task.queuePosition,
  });

  const isActive = task.status === "queued" || task.status === "running";
  const isFailed = task.status === "failed";
  const isCompleted = task.status === "completed";
  const showProgress =
    task.status === "running" &&
    (task.phase === "running" || task.phase === "preparing");

  return (
    <ListRowCard
      className={cn(
        "flex-row items-center justify-between gap-3",
        isFailed && "border-destructive/40",
        isCompleted && "border-success/40",
      )}
    >
      <div className="min-w-0 flex flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <Link
            to={`/api-tasks/${task.taskId}`}
            className={cn(
              typography.listTitleEmphasized,
              "truncate hover:underline",
            )}
          >
            {title}
          </Link>
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            {isActive ? (
              <Loader2 className="size-3.5 shrink-0 animate-spin" />
            ) : null}
            <span>{statusLabel}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(task.createdAt)}</span>
          </p>
        </div>

        {showProgress ? (
          <Progress value={task.progress} className="h-2 max-w-md" />
        ) : null}

        {task.message && isActive ? (
          <p className="text-muted-foreground truncate text-xs">
            {task.message}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isActive ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onCancel();
            }}
            disabled={isCancelling}
          >
            {isCancelling ? "Скасування…" : "Скасувати"}
          </Button>
        ) : null}
      </div>
    </ListRowCard>
  );
}
