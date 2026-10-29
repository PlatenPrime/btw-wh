import { DetailPanelCard } from "@/components/shared/cards";
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
  return (
    <DetailPanelCard className="p-4">
      <div className="grid gap-4">
        <p className={typography.sectionLabel}>Задачі</p>
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <FileSpreadsheet className="size-6 text-muted-foreground" />
            <div className="grid gap-1">
              <p className={typography.sectionTitle}>Немає Excel задач</p>
              <p className={typography.pageDescription}>
                Замовлений звіт зʼявиться тут із прогресом і кнопкою завантаження.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            {jobs.map((tracked) => (
              <ExcelJobCard key={tracked.job.jobId} tracked={tracked} />
            ))}
          </div>
        )}
      </div>
    </DetailPanelCard>
  );
}
