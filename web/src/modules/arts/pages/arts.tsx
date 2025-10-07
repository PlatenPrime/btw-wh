import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ArtsContainer } from "@/modules/arts/components/containers/arts-container/ArtsContainer.tsx";
import { ArtsContainerSkeleton } from "@/modules/arts/components/containers/arts-container/ArtsContainerSkeleton.tsx";
import { ArtsFetcher } from "@/modules/arts/components/fetchers/arts-fetcher/ArtsFetcher.tsx";

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
