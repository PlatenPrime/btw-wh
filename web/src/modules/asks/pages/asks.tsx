import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { AsksFetcher } from "../components/fetchers/asks-fetcher/AsksFetcher";
import { AsksContainer } from "../components/containers/asks-container/AsksContainer";
import { AsksContainerSkeleton } from "../components/containers/asks-container/AsksContainerSkeleton";

export function Asks() {
  return (
    <SidebarInsetLayout headerText="Запити">
      <main className="p-4">
        <AsksFetcher
          ContainerComponent={AsksContainer}
          SkeletonComponent={AsksContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
