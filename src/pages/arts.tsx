import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";
import { DashboardContainer } from "@/modules/arts/components/DashboardContainer";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
     
        <DashboardContainer />
   
    </SidebarInsetLayout>
  );
}
