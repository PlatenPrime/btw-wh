import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { PullContainer } from "@/modules/pulls/components/containers/pull-container/PullContainer";
import { PullContainerSkeleton } from "@/modules/pulls/components/containers/pull-container/PullContainerSkeleton";
import { PullFetcher } from "@/modules/pulls/components/fetchers/pull-fetcher/PullFetcher";
import { useParams } from "react-router";

export function Pull() {
  const { palletId } = useParams<{ palletId: string }>();

  if (!palletId) {
    return (
      <SidebarInsetLayout headerText="Pull">
        <main className="p-2">
          <div className="text-muted-foreground text-center">
            ID паллети не знайдено
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText="Pull">
      <main className="p-2">
        <PullFetcher
          palletId={palletId}
          ContainerComponent={PullContainer}
          SkeletonComponent={PullContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
