import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  RowsContainer,
  RowsContainerSkeleton,
} from "@/modules/rows/components/containers/rows-container";
import { RowsFetcher } from "@/modules/rows/components/fetchers";

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
