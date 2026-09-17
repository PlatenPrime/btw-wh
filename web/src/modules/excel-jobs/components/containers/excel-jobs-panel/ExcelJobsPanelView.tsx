import { Button } from "@/components/ui/button";
import { ExcelJobCard } from "@/modules/excel-jobs/components/cards/excel-job-card";
import type { TrackedExcelJob } from "@/modules/excel-jobs/types/tracked-job";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ChevronDown, FileSpreadsheet } from "lucide-react";

interface ExcelJobsPanelViewProps {
  jobs: TrackedExcelJob[];
  isOpen: boolean;
  onToggle: () => void;
}

export function ExcelJobsPanelView({
  jobs,
  isOpen,
  onToggle,
}: ExcelJobsPanelViewProps) {
  if (jobs.length === 0) return null;

  const activeCount = jobs.filter(
    (item) =>
      item.job.status === "queued" ||
      item.job.status === "running" ||
      (item.job.status === "ready" && !item.downloaded) ||
      item.job.status === "failed",
  ).length;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(100vw-2rem,22rem)] flex-col items-end gap-2">
      {!isOpen ? (
        <Button
          type="button"
          variant="info"
          size="sm"
          className="pointer-events-auto shadow-elevation-2"
          onClick={onToggle}
        >
          <FileSpreadsheet className="size-4" />
          Excel
          {activeCount > 0 ? (
            <span className="bg-background/20 rounded-md px-1.5 text-xs">
              {activeCount}
            </span>
          ) : null}
        </Button>
      ) : (
        <div
          className={cn(
            "pointer-events-auto flex w-full flex-col gap-3 rounded-xl border border-border p-3 shadow-elevation-3",
            "glass-overlay bg-popover/95",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="text-info size-4 shrink-0" />
              <h2 className={typography.sectionTitle}>Підготовка Excel</h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={onToggle}
              aria-label="Згорнути панель"
            >
              <ChevronDown className="size-3.5" />
            </Button>
          </div>

          <div className="flex max-h-[min(60vh,28rem)] flex-col gap-2 overflow-y-auto">
            {jobs.map((tracked) => (
              <ExcelJobCard key={tracked.job.jobId} tracked={tracked} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
