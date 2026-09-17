import { useExcelJobs } from "@/modules/excel-jobs/providers/excel-jobs-provider";
import type { TrackedExcelJob } from "@/modules/excel-jobs/types/tracked-job";
import { useCallback, useState } from "react";
import { ExcelJobCardView } from "./ExcelJobCardView";

interface ExcelJobCardProps {
  tracked: TrackedExcelJob;
}

export function ExcelJobCard({ tracked }: ExcelJobCardProps) {
  const { cancelJob, retryJob, dismissJob, downloadJob } = useExcelJobs();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = useCallback(async () => {
    setIsCancelling(true);
    try {
      await cancelJob(tracked.job.jobId);
    } finally {
      setIsCancelling(false);
    }
  }, [cancelJob, tracked.job.jobId]);

  const handleRetry = useCallback(() => {
    void retryJob(tracked.job.jobId);
  }, [retryJob, tracked.job.jobId]);

  const handleDismiss = useCallback(() => {
    dismissJob(tracked.job.jobId);
  }, [dismissJob, tracked.job.jobId]);

  const handleDownload = useCallback(() => {
    void downloadJob(tracked.job.jobId);
  }, [downloadJob, tracked.job.jobId]);

  return (
    <ExcelJobCardView
      tracked={tracked}
      onCancel={handleCancel}
      onRetry={handleRetry}
      onDismiss={handleDismiss}
      onDownload={handleDownload}
      isCancelling={isCancelling}
    />
  );
}
