import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { PullsContainer } from "@/modules/asks/components/containers/pulls-container/PullsContainer";
import { PullsContainerSkeleton } from "@/modules/asks/components/containers/pulls-container/PullsContainerSkeleton";
import { PullsFetcher } from "@/modules/asks/components/fetchers/pulls-fetcher/PullsFetcher";

export function Pulls() {
  return (
    <SidebarInsetLayout headerText="Зняття">
      <main className="p-2">
        <PullsFetcher
          ContainerComponent={PullsContainer}
          SkeletonComponent={PullsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}

