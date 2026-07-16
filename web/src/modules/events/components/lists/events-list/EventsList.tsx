import type { EventsListResponse } from "@/modules/events/api/types";
import { EventsListEmpty } from "@/modules/events/components/lists/events-list/EventsListEmpty";
import { EventsListView } from "@/modules/events/components/lists/events-list/EventsListView";

interface EventsListProps {
  data: EventsListResponse;
  selectedDate: Date;
}

export function EventsList({ data, selectedDate }: EventsListProps) {
  if (data.data.length === 0) {
    return <EventsListEmpty selectedDate={selectedDate} />;
  }

  return <EventsListView events={data.data} />;
}
