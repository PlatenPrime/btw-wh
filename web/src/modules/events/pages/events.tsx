import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import {
  EventsContainer,
  EventsContainerSkeleton,
} from "@/modules/events/components/containers/events-container";
import { EventsFetcher } from "@/modules/events/components/fetchers/events-fetcher";

export function EventsPage() {
  return (
    <SidebarInsetLayout headerText="Події">
      <main className="p-2">
        <EventsFetcher
          ContainerComponent={EventsContainer}
          SkeletonComponent={EventsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
