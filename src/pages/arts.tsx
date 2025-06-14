import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { DashboardContainer } from "@/modules/arts/components/dashboard";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <DashboardContainer />
    </SidebarInsetLayout>
  );
}
