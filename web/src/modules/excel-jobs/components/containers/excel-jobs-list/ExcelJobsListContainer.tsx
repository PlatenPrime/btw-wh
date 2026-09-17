import { useExcelJobs } from "@/modules/excel-jobs/providers/excel-jobs-provider";
import { ExcelJobsListContainerView } from "./ExcelJobsListContainerView";

export function ExcelJobsListContainer() {
  const { jobs } = useExcelJobs();
  return <ExcelJobsListContainerView jobs={jobs} />;
}
