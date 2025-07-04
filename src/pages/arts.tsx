import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { DashboardInfiniteContainer } from "@/modules/arts/components/dashboard-infinite";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <DashboardInfiniteContainer />
    </SidebarInsetLayout>
  );
}
