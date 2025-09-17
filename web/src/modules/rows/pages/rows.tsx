import { SidebarInsetLayout } from '@/components/shared/layout/sidebar-inset-layout';
import { RowsFetcher } from "@/modules/rows/components/fetchers";
import { RowsContainer, RowsContainerSkeleton } from "@/modules/rows/components/containers/rows-container";

export function Rows() {
  return (
    <SidebarInsetLayout headerText="Ряди">
      <main className="p-4">
        <RowsFetcher
          ContainerComponent={RowsContainer}
          SkeletonComponent={RowsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
