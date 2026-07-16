import type { EventDto } from "@/modules/events/api/types";
import { EventRowView } from "@/modules/events/components/cards/event-row";

interface EventsListViewProps {
  events: EventDto[];
}

export function EventsListView({ events }: EventsListViewProps) {
  return (
    <div className="grid gap-2">
      {events.map((event) => (
        <EventRowView key={event._id} event={event} />
      ))}
    </div>
  );
}
