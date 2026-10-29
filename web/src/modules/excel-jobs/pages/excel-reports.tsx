import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { ExcelJobsListContainer } from "@/modules/excel-jobs/components/containers/excel-jobs-list";
import { ExcelReportOrderContainer } from "@/modules/excel-jobs/components/containers/excel-report-order";

export function ExcelReportsPage() {
  return (
    <SidebarInsetLayout headerText="Excel звіти">
      <main className="grid items-start gap-6 p-2 xl:grid-cols-2">
        <ExcelReportOrderContainer />
        <ExcelJobsListContainer />
      </main>
    </SidebarInsetLayout>
  );
}
