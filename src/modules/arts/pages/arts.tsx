import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtsInfiniteDashboard } from "@/modules/arts/components/containers/arts-infinite-dashboard/ArtsInfiniteDashboard";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <ArtsInfiniteDashboard />
    </SidebarInsetLayout>
  );
}
