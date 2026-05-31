import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SurfaceSection } from "@/components/shared/layout";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";
import {
  ZoneContainer,
  ZoneContainerSkeleton,
} from "@/modules/zones/components/containers/zone-container";
import { ZoneFetcher } from "@/modules/zones/components/fetchers/zone-fetcher";
import { useParams } from "react-router";

export function Zone() {
  const { title } = useParams<{ title: string }>();

  if (!title) {
    return (
      <SidebarInsetLayout headerText="Зона не знайдена">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            Назва зони не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText={`Зона ${title}`}>
      <main className="p-2">
        <div className="flex flex-col gap-2">
          <SurfaceSection>
            <ZoneFetcher
              zoneTitle={title}
              ContainerComponent={({ zone }) => <ZoneContainer zone={zone} />}
              SkeletonComponent={ZoneContainerSkeleton}
            />
          </SurfaceSection>
          <SurfaceSection>
            <ArtsByZoneFetcher
              zone={title}
              ContainerComponent={ArtsByZoneContainer}
              SkeletonComponent={ArtsByZoneContainerSkeleton}
            />
          </SurfaceSection>
        </div>
      </main>
    </SidebarInsetLayout>
  );
}
