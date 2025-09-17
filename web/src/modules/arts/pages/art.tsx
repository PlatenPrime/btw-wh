import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";
import { ArtContainer } from "@/modules/arts/components/containers/art-container/ArtContainer.tsx";
import { ArtContainerSkeleton } from "@/modules/arts/components/containers/art-container/ArtContainerSkeleton.tsx";
import { ArtFetcher } from "@/modules/arts/components/fetchers/art-fetcher/ArtFetcher.tsx";
import { useParams } from "react-router";

export function Art() {
  const { artikul } = useParams<{ artikul: string }>();

  return (
    <SidebarInsetLayout headerText={`Артикул: ${artikul || "невідомий"}`}>
      <div className="flex min-h-screen w-full flex-col gap-2 p-2">
        <ArtFetcher
          artikul={artikul || ""}
          ContainerComponent={ArtContainer}
          SkeletonComponent={ArtContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
