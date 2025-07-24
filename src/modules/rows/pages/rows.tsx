import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { RowsDashboard } from "@/modules/rows/components/containers/rows-dashboard";

export function Rows() {
  return (
    <SidebarInsetLayout headerText="Ряди">
      <main className="p-4">
        <RowsDashboard />
      </main>
    </SidebarInsetLayout>
  );
}
