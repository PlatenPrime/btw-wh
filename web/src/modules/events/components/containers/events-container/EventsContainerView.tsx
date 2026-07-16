import { DateNavigation } from "@/components/shared/date/date-navigation/DateNavigation";
import { PaginationControls } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import type { EventsListResponse } from "@/modules/events/api/types";
import { EventsList } from "@/modules/events/components/lists/events-list";

interface EventsContainerViewProps {
  selectedDate: Date;
  data: EventsListResponse;
  page: number;
  isFetching: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
  onPageChange: (page: number) => void;
}

export function EventsContainerView({
  selectedDate,
  data,
  page,
  isFetching,
  onPreviousDay,
  onNextDay,
  onDateSelect,
  onPageChange,
}: EventsContainerViewProps) {
  const { pagination } = data;

  return (
    <main className="grid gap-2">
      <SurfaceSection className="grid gap-2 lg:grid-cols-2">
        <DateNavigation
          selectedDate={selectedDate}
          onPreviousDay={onPreviousDay}
          onNextDay={onNextDay}
          onDateSelect={onDateSelect}
        />

        <div className="flex w-full items-center justify-end gap-2">
          <p className="text-foreground font-medium">
            {data.data.length}/{pagination.total}
          </p>
        </div>
      </SurfaceSection>

      <SurfaceSection className={isFetching ? "opacity-50" : ""}>
        <div className="grid gap-2">
          <PaginationControls
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            isPending={isFetching}
          />
          <EventsList data={data} selectedDate={selectedDate} />
        </div>
      </SurfaceSection>
    </main>
  );
}
