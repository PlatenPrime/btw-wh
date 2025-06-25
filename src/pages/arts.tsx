import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
// import { DashboardContainer } from "@/modules/arts/components/dashboard";
import { DashboardInfiniteContainer } from "@/modules/arts/components/dashboard-infinite/DashboardInfiniteContainer";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      {/* <DashboardContainer /> */}
      <DashboardInfiniteContainer />
    </SidebarInsetLayout>
  );
}
