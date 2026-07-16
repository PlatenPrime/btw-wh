import { SurfaceSection } from "@/components/shared/layout";
import { DateNavigationSkeleton } from "@/components/shared/date/date-navigation/DateNavigationSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { EventsListSkeleton } from "@/modules/events/components/lists/events-list";

export function EventsContainerSkeleton() {
  return (
    <main className="grid gap-2">
      <SurfaceSection className="grid gap-2 lg:grid-cols-2">
        <DateNavigationSkeleton />
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-5 w-20" />
        </div>
      </SurfaceSection>
      <SurfaceSection>
        <div className="grid gap-2">
          <Skeleton className="h-12" />
          <EventsListSkeleton />
        </div>
      </SurfaceSection>
    </main>
  );
}
