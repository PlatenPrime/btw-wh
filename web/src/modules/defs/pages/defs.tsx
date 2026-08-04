import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import {
  DefsContainer,
  DefsContainerSkeleton,
} from "@/modules/defs/components/containers/defs-container";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher";

export function Defs() {
  return (
    <SidebarInsetLayout headerText="Дефіцити">
      <main className="grid gap-2 p-2">
        <LatestDefsFetcher
          ContainerComponent={DefsContainer}
          SkeletonComponent={DefsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
