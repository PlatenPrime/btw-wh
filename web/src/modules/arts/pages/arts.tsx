import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtsFetcher } from "../components/fetchers/arts-fetcher/ArtsFetcher";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <ArtsFetcher />
    </SidebarInsetLayout>
  );
}
