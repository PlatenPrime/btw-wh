import { SidebarInsetLayout } from '@/components/shared/layout/sidebar-inset-layout';
import { ArtsFetcher } from "@/modules/arts/components/fetchers/arts-fetcher/ArtsFetcher.tsx";
import { ArtsContainer } from "@/modules/arts/components/containers/arts-container/ArtsContainer.tsx";
import { ArtsContainerSkeleton } from "@/modules/arts/components/containers/arts-container/ArtsContainerSkeleton.tsx";

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
