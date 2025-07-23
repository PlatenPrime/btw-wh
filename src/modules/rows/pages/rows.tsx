import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { Dashboard } from "@/modules/rows/components/containers/dashboard";

export function Rows() {
  return (
    <SidebarInsetLayout headerText="Ряди">
      <main className="p-4">
        <Dashboard />
      </main>
    </SidebarInsetLayout>
  );
}
