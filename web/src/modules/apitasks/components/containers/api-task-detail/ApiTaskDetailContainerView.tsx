import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChip } from "@/components/shared/elements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ApiTaskDto, ApiTaskParams } from "@/modules/apitasks/api/types";
import { ApiTaskStatusBadge } from "@/modules/apitasks/components/elements/api-task-status-badge";
import {
  formatApiTaskJson,
  getApiTaskKindLabel,
  getApiTaskPhaseLabel,
  getApiTaskResultMetricEntries,
  getApiTaskStatusBadgeLabel,
  getApiTaskStatusLabel,
  getApiTaskStatusTone,
} from "@/modules/apitasks/utils/labels";
import { formatDate } from "@/utils/formatDate";
import {
  Activity,
  ArrowLeft,
  CalendarClock,
  CalendarPlus,
  Hash,
  Layers,
  ListOrdered,
  Loader2,
  MessageSquare,
  Percent,
  RefreshCw,
  Tag,
} from "lucide-react";
import { Link } from "react-router";

interface ApiTaskDetailContainerViewProps {
  task: ApiTaskDto;
  trackedParams?: ApiTaskParams;
  onCancel: () => void;
  onRetry: () => void;
  isCancelling?: boolean;
  canRetry?: boolean;
}

function SectionLabel({ children }: { children: string }) {
  return <span className={typography.sectionLabel}>{children}</span>;
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="bg-muted/40 max-h-96 overflow-auto rounded-md p-3 text-xs">
      {formatApiTaskJson(value)}
    </pre>
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
  const statusTone = getApiTaskStatusTone(task.status);
  const isActive = task.status === "queued" || task.status === "running";
  const isFailed = task.status === "failed";
  const isCompleted = task.status === "completed";
  const showProgress = isActive && task.progress > 0;
  const paramsToShow =
    trackedParams && Object.keys(trackedParams).length > 0
      ? trackedParams
      : null;
  const resultMetrics =
    isCompleted && task.result != null
      ? getApiTaskResultMetricEntries(task.result)
      : [];

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

      <DetailPanelCard
        className={cn(
          "gap-0 overflow-hidden p-0",
          isFailed && "border-destructive/40",
          isCompleted && "border-success/40",
        )}
      >
        <section className="grid gap-3 border-b border-border p-4 sm:p-5">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="grid min-w-0 flex-1 gap-1">
              <h1 className={typography.detailTitle}>{title}</h1>
              <p
                className={cn(
                  typography.detailSubtitle,
                  "flex items-center gap-1.5",
                )}
              >
                {isActive ? (
                  <Loader2 className="size-3.5 shrink-0 animate-spin" />
                ) : null}
                <span>{statusLabel}</span>
              </p>
            </div>
            <ApiTaskStatusBadge status={task.status} className="shrink-0" />
          </div>

          {showProgress ? (
            <Progress value={task.progress} className="h-2" />
          ) : null}
        </section>

        <div className="grid sm:grid-cols-2 sm:items-stretch">
          <section className="grid min-w-0 gap-3 self-start border-border p-4 sm:border-r sm:p-5">
            <SectionLabel>Стан</SectionLabel>
            <div className="grid gap-2">
              <MetricChip
                icon={Activity}
                tone={statusTone}
                label="Статус"
                value={getApiTaskStatusBadgeLabel(task.status)}
                className="w-full"
              />
              <MetricChip
                icon={Layers}
                tone="info"
                label="Фаза"
                value={getApiTaskPhaseLabel(task.phase)}
                className="w-full"
              />
              <MetricChip
                icon={Percent}
                tone="primary"
                label="Прогрес"
                value={`${Math.round(task.progress)}%`}
                className="w-full"
              />
              <MetricChip
                icon={ListOrdered}
                tone="muted"
                label="Черга"
                value={
                  task.queuePosition == null ? "—" : String(task.queuePosition)
                }
                className="w-full"
              />
            </div>
          </section>

          <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:border-t-0 sm:p-5">
            <SectionLabel>Мета</SectionLabel>
            <div className="grid gap-2">
              <MetricChip
                icon={Tag}
                tone="muted"
                label="Тип"
                value={
                  <span className="grid gap-0.5">
                    <span>{title}</span>
                    <code className="text-muted-foreground text-xs font-normal">
                      {task.kind}
                    </code>
                  </span>
                }
                className="w-full"
              />
              <MetricChip
                icon={Hash}
                tone="info"
                label="Task ID"
                value={<code className="text-xs">{task.taskId}</code>}
                className="w-full"
              />
              <MetricChip
                icon={CalendarPlus}
                tone="muted"
                label="Створено"
                value={formatDate(task.createdAt)}
                className="w-full"
              />
              <MetricChip
                icon={RefreshCw}
                tone="muted"
                label="Оновлено"
                value={formatDate(task.updatedAt)}
                className="w-full"
              />
              <MetricChip
                icon={CalendarClock}
                tone="muted"
                label="Діє до"
                value={formatDate(task.expiresAt)}
                className="w-full"
              />
            </div>
          </section>
        </div>

        {task.message ? (
          <section className="grid gap-3 border-t border-border p-4 sm:p-5">
            <SectionLabel>Повідомлення</SectionLabel>
            <MetricChip
              icon={MessageSquare}
              tone="edit"
              label="Message"
              value={task.message}
              className="w-full"
            />
          </section>
        ) : null}

        {isFailed && task.error ? (
          <section className="grid gap-3 border-t border-border p-4 sm:p-5">
            <SectionLabel>Помилка</SectionLabel>
            <p className="text-destructive whitespace-pre-wrap text-sm">
              {task.error}
            </p>
          </section>
        ) : null}

        {paramsToShow ? (
          <section className="grid gap-3 border-t border-border p-4 sm:p-5">
            <SectionLabel>Params</SectionLabel>
            <JsonBlock value={paramsToShow} />
          </section>
        ) : null}

        {isCompleted && task.result != null ? (
          <section className="grid gap-3 border-t border-border p-4 sm:p-5">
            <SectionLabel>Result</SectionLabel>
            {resultMetrics.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {resultMetrics.map((entry) => (
                  <MetricChip
                    key={entry.key}
                    icon={Hash}
                    tone="success"
                    label={entry.key}
                    value={entry.value}
                  />
                ))}
              </div>
            ) : null}
            <JsonBlock value={task.result} />
          </section>
        ) : null}
      </DetailPanelCard>
    </div>
  );
}
