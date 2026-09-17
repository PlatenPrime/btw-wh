import { ExcelJobCard } from "@/modules/excel-jobs/components/cards/excel-job-card";
import type { TrackedExcelJob } from "@/modules/excel-jobs/types/tracked-job";
import { typography } from "@/lib/typography";
import { FileSpreadsheet } from "lucide-react";

interface ExcelJobsListContainerViewProps {
  jobs: TrackedExcelJob[];
}

export function ExcelJobsListContainerView({
  jobs,
}: ExcelJobsListContainerViewProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-card/40 px-6 py-16 text-center">
        <FileSpreadsheet className="text-muted-foreground size-8" />
        <div className="flex flex-col gap-1">
          <p className={typography.sectionTitle}>Немає активних Excel задач</p>
          <p className={typography.pageDescription}>
            Запустіть експорт з будь-якого екрана — задача зʼявиться тут із
            прогресом підготовки та кнопкою завантаження.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {jobs.map((tracked) => (
        <ExcelJobCard key={tracked.job.jobId} tracked={tracked} />
      ))}
    </div>
  );
}
