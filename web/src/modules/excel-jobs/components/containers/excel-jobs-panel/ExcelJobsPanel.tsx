import { useExcelJobs } from "@/modules/excel-jobs/providers/excel-jobs-provider";
import { useCallback } from "react";
import { ExcelJobsPanelView } from "./ExcelJobsPanelView";

export function ExcelJobsPanel() {
  const { jobs, isPanelOpen, setPanelOpen } = useExcelJobs();

  const handleToggle = useCallback(() => {
    setPanelOpen(!isPanelOpen);
  }, [isPanelOpen, setPanelOpen]);

  return (
    <ExcelJobsPanelView
      jobs={jobs}
      isOpen={isPanelOpen}
      onToggle={handleToggle}
    />
  );
}
