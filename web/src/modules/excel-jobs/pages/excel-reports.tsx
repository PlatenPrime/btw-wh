import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { ExcelJobsListContainer } from "@/modules/excel-jobs/components/containers/excel-jobs-list";

export function ExcelReportsPage() {
  return (
    <SidebarInsetLayout headerText="Excel звіти">
      <main className="grid gap-2 p-2">
        <ExcelJobsListContainer />
      </main>
    </SidebarInsetLayout>
  );
}
