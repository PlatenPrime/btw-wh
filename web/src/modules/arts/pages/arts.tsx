import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ArtsContainer } from "@/modules/arts/components/containers/arts-container/ArtsContainer.tsx";
import { ArtsContainerSkeleton } from "@/modules/arts/components/containers/arts-container/ArtsContainerSkeleton.tsx";
import { ArtsFetcher } from "@/modules/arts/components/fetchers/arts-fetcher/ArtsFetcher.tsx";
import { useDashboardParams } from "@/modules/arts/hooks/useDashboardParams";

export function Arts() {
  const { page, limit, search, setPage, setLimit, setSearch } = useDashboardParams();

  return (
    <SidebarInsetLayout headerText="Артикули">
      <ArtsFetcher
        page={page}
        limit={limit}
        search={search}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearchChange={setSearch}
        ContainerComponent={ArtsContainer}
        SkeletonComponent={ArtsContainerSkeleton}
      />
    </SidebarInsetLayout>
  );
}
