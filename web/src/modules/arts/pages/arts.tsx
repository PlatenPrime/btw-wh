import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtsFetcher } from "../components/fetchers/arts-fetcher/ArtsFetcher";
import { ArtsContainer } from "../components/containers/arts-container/ArtsContainer";
import { ArtsContainerSkeleton } from "../components/containers/arts-container/ArtsContainerSkeleton";

export function Arts() {
  return (
    <SidebarInsetLayout headerText="Артикули">
      <ArtsFetcher
        ContainerComponent={ArtsContainer}
        SkeletonComponent={ArtsContainerSkeleton}
      />
    </SidebarInsetLayout>
  );
}
