import { EventRowSkeleton } from "@/modules/events/components/cards/event-row";

export function EventsListSkeleton() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <EventRowSkeleton key={index} />
      ))}
    </div>
  );
}
