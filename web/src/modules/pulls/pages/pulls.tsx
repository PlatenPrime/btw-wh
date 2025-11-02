import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { PullsContainer } from "@/modules/pulls/components/containers/pulls-container/PullsContainer";
import { PullsContainerSkeleton } from "@/modules/pulls/components/containers/pulls-container/PullsContainerSkeleton";
import { PullsFetcher } from "@/modules/pulls/components/fetchers/pulls-fetcher/PullsFetcher";

export function Pulls() {
  return (
    <SidebarInsetLayout headerText="Pulls">
      <main className="p-2">
        <PullsFetcher
          ContainerComponent={PullsContainer}
          SkeletonComponent={PullsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}

