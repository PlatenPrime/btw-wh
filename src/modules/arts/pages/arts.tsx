import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { DashboardInfiniteContainer } from "@/modules/arts/components/containers/arts-dashboard-infinite/DashboardInfiniteContainer";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <DashboardInfiniteContainer />
    </SidebarInsetLayout>
  );
}
