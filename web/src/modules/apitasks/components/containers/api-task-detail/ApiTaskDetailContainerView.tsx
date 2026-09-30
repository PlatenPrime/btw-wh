import { ListRowCard } from "@/components/shared/cards";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ApiTaskDto, ApiTaskParams } from "@/modules/apitasks/api/types";import {
  formatApiTaskJson,
  getApiTaskKindLabel,
  getApiTaskStatusLabel,
} from "@/modules/apitasks/utils/labels";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";

interface ApiTaskDetailContainerViewProps {
  task: ApiTaskDto;
  trackedParams?: ApiTaskParams;
  onCancel: () => void;
  onRetry: () => void;
  isCancelling?: boolean;
  canRetry?: boolean;
}

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        {label}
      </p>
      <div className={cn(typography.body, "break-words")}>{children}</div>
    </div>
  );
}

export function ApiTaskDetailContainerView({
  task,
  trackedParams,
  onCancel,
  onRetry,
  isCancelling = false,
  canRetry = false,
}: ApiTaskDetailContainerViewProps) {
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
  const showProgress = isActive && task.progress > 0;
  const paramsToShow =
    trackedParams && Object.keys(trackedParams).length > 0
      ? trackedParams
      : null;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/api-tasks" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            До списку задач
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {isActive ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Скасування…" : "Скасувати"}
            </Button>
          ) : null}
          {isFailed && canRetry ? (
            <Button type="button" variant="default" size="sm" onClick={onRetry}>
              Повторити
            </Button>
          ) : null}
        </div>
      </div>

      <ListRowCard
        className={cn(
          "flex-col items-stretch gap-4",
          isFailed && "border-destructive/40",
          isCompleted && "border-success/40",
        )}
      >
        <div className="grid gap-1">
          <h1 className={typography.sectionTitle}>{title}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            {isActive ? (
              <Loader2 className="size-3.5 shrink-0 animate-spin" />
            ) : null}
            <span>{statusLabel}</span>
          </p>
        </div>

        {showProgress ? (
          <Progress value={task.progress} className="h-2" />
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailField label="Task ID">
            <code className="text-xs">{task.taskId}</code>
          </DetailField>
          <DetailField label="Kind">
            <code className="text-xs">{task.kind}</code>
          </DetailField>
          <DetailField label="Status">{task.status}</DetailField>
          <DetailField label="Phase">{task.phase}</DetailField>
          <DetailField label="Progress">{Math.round(task.progress)}%</DetailField>
          <DetailField label="Черга">
            {task.queuePosition == null ? "—" : String(task.queuePosition)}
          </DetailField>
          <DetailField label="Створено">{formatDate(task.createdAt)}</DetailField>
          <DetailField label="Оновлено">{formatDate(task.updatedAt)}</DetailField>
          <DetailField label="Expires">{formatDate(task.expiresAt)}</DetailField>
        </div>

        {task.message ? (
          <DetailField label="Message">{task.message}</DetailField>
        ) : null}

        {isFailed && task.error ? (
          <DetailField label="Error">
            <p className="text-destructive whitespace-pre-wrap">{task.error}</p>
          </DetailField>
        ) : null}

        {paramsToShow ? (
          <DetailField label="Params">
            <pre className="bg-muted/40 max-h-64 overflow-auto rounded-md p-3 text-xs">
              {formatApiTaskJson(paramsToShow)}
            </pre>
          </DetailField>
        ) : null}

        {isCompleted && task.result != null ? (
          <DetailField label="Result">
            <pre className="bg-muted/40 max-h-96 overflow-auto rounded-md p-3 text-xs">
              {formatApiTaskJson(task.result)}
            </pre>
          </DetailField>
        ) : null}
      </ListRowCard>
    </div>
  );
}
