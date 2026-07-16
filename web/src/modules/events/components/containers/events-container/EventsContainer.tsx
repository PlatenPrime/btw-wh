import type { EventsListResponse } from "@/modules/events/api/types";
import { EventsContainerView } from "@/modules/events/components/containers/events-container/EventsContainerView";
import { addDays, subDays } from "date-fns";

interface EventsContainerProps {
  data: EventsListResponse;
  isFetching: boolean;
  selectedDate: Date;
  page: number;
  setDate: (date: Date) => void;
  setPage: (page: number) => void;
}

export function EventsContainer({
  data,
  isFetching,
  selectedDate,
  page,
  setDate,
  setPage,
}: EventsContainerProps) {
  const handlePreviousDay = () => {
    setDate(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(selectedDate, 1));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <EventsContainerView
      selectedDate={selectedDate}
      data={data}
      page={page}
      isFetching={isFetching}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
      onPageChange={setPage}
    />
  );
}
