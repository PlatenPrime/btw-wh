import { ListRowCard } from "@/components/shared/cards";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { TrackedExcelJob } from "@/modules/excel-jobs/types/tracked-job";
import {
  formatExcelFileSize,
  getExcelJobStatusLabel,
} from "@/modules/excel-jobs/utils/labels";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Loader2, X } from "lucide-react";

interface ExcelJobCardViewProps {
  tracked: TrackedExcelJob;
  onCancel: () => void;
  onRetry: () => void;
  onDismiss: () => void;
  onDownload: () => void;
  isCancelling?: boolean;
}

export function ExcelJobCardView({
  tracked,
  onCancel,
  onRetry,
  onDismiss,
  onDownload,
  isCancelling = false,
}: ExcelJobCardViewProps) {
  const { job, title, downloaded } = tracked;
  const statusLabel = getExcelJobStatusLabel({
    status: job.status,
    phase: job.phase,
    progress: job.progress,
    queuePosition: job.queuePosition,
  });

  const isActive = job.status === "queued" || job.status === "running";
  const isFailed = job.status === "failed";
  const isReady = job.status === "ready";
  const showBuildingProgress =
    job.status === "running" && job.phase === "building";

  return (
    <ListRowCard
      className={cn(
        "flex-row items-center justify-between gap-3",
        isFailed && "border-destructive/40",
        isReady && downloaded && "border-success/40",
      )}
    >
      <div className="min-w-0 flex flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className={cn(typography.listTitleEmphasized, "truncate")}>
            {title}
          </p>
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            {isActive ? (
              <Loader2 className="size-3.5 shrink-0 animate-spin" />
            ) : null}
            <span>{statusLabel}</span>
          </p>
        </div>

        {showBuildingProgress ? (
          <Progress value={job.progress} className="h-2 max-w-md" />
        ) : null}

        {isFailed && job.error ? (
          <p className="text-destructive truncate text-xs">{job.error}</p>
        ) : null}

        {isReady && job.fileName ? (
          <p className="text-muted-foreground truncate text-xs">
            {job.fileName}
            {job.sizeBytes != null
              ? ` · ${formatExcelFileSize(job.sizeBytes)}`
              : ""}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
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
        {isFailed ? (
          <Button type="button" variant="default" size="sm" onClick={onRetry}>
            Повторити
          </Button>
        ) : null}
        {isReady ? (
          <Button type="button" variant="success" size="sm" onClick={onDownload}>
            {downloaded ? "Завантажити ще" : "Завантажити"}
          </Button>
        ) : null}
        {!isActive ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={onDismiss}
            aria-label="Закрити"
          >
            <X className="size-3.5" />
          </Button>
        ) : null}
      </div>
    </ListRowCard>
  );
}
