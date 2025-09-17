import { SidebarInsetLayout } from '@/components/shared/layout/sidebar-inset-layout';
import { AsksFetcher } from "@/modules/asks/components/fetchers/asks-fetcher/AsksFetcher.tsx";
import { AsksContainer } from "@/modules/asks/components/containers/asks-container/AsksContainer.tsx";
import { AsksContainerSkeleton } from "@/modules/asks/components/containers/asks-container/AsksContainerSkeleton.tsx";

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
