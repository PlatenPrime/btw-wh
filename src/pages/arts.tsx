import { Dashboard } from "@/components/modules/arts/components/Dashboard";
import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <main className=" p-4">
        <Dashboard />
      </main>
    </SidebarInsetLayout>
  );
}
