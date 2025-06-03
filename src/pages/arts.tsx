import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";
import { Dashboard } from "@/modules/arts/components/Dashboard";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <main className=" p-4">
        <Dashboard />
      </main>
    </SidebarInsetLayout>
  );
}
