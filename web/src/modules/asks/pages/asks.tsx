import { SidebarInsetLayout } from "@/components/shared/layout/SidebarInsetLayout";
import { AsksContainer } from "@/modules/asks/components/containers/asks-container/AsksContainer.tsx";
import { AsksContainerSkeleton } from "@/modules/asks/components/containers/asks-container/AsksContainerSkeleton.tsx";
import { AsksFetcher } from "@/modules/asks/components/fetchers/asks-fetcher/AsksFetcher.tsx";

export function Asks() {
  return (
    <SidebarInsetLayout headerText="Запити">
      <main className="p-2">
        <AsksFetcher
          ContainerComponent={AsksContainer}
          SkeletonComponent={AsksContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
