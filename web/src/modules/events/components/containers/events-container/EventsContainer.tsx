import type { EventsListResponse, EventType } from "@/modules/events/api/types";
import { EventsContainerView } from "@/modules/events/components/containers/events-container/EventsContainerView";
import { addDays, subDays } from "date-fns";

interface EventsContainerProps {
  data: EventsListResponse;
  isFetching: boolean;
  selectedDate: Date;
  page: number;
  limit: number;
  department: string;
  type: EventType | "";
  setDate: (date: Date) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setDepartment: (department: string) => void;
  setType: (type: EventType | "") => void;
}

export function EventsContainer({
  data,
  isFetching,
  selectedDate,
  page,
  limit,
  department,
  type,
  setDate,
  setPage,
  setLimit,
  setDepartment,
  setType,
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
      limit={limit}
      department={department}
      type={type}
      isFetching={isFetching}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
      onPageChange={setPage}
      onLimitChange={setLimit}
      onDepartmentChange={setDepartment}
      onTypeChange={setType}
    />
  );
}
