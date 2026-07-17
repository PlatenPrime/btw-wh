import { PaginationControls, SelectLimit } from "@/components/shared/controls";
import { DateNavigation } from "@/components/shared/date/date-navigation/DateNavigation";
import { SurfaceSection } from "@/components/shared/layout";
import type { EventsListResponse, EventType } from "@/modules/events/api/types";
import { DepartmentSelectView } from "@/modules/events/components/controls/department-select";
import { EventTypeSelectView } from "@/modules/events/components/controls/event-type-select";
import { EventsList } from "@/modules/events/components/lists/events-list";
import { EVENTS_LIMIT_OPTIONS } from "@/modules/events/constants";

interface EventsContainerViewProps {
  selectedDate: Date;
  data: EventsListResponse;
  page: number;
  limit: number;
  department: string;
  type: EventType | "";
  isFetching: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDepartmentChange: (department: string) => void;
  onTypeChange: (type: EventType | "") => void;
}

export function EventsContainerView({
  selectedDate,
  data,
  page,
  limit,
  department,
  type,
  isFetching,
  onPreviousDay,
  onNextDay,
  onDateSelect,
  onPageChange,
  onLimitChange,
  onDepartmentChange,
  onTypeChange,
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

        <div className="flex w-full flex-wrap items-center justify-end gap-2">
          <EventTypeSelectView
            type={type}
            onTypeChange={onTypeChange}
            disabled={isFetching}
          />
          <DepartmentSelectView
            department={department}
            onDepartmentChange={onDepartmentChange}
            disabled={isFetching}
          />
          <SelectLimit
            limit={limit}
            setLimit={onLimitChange}
            limitOptions={[...EVENTS_LIMIT_OPTIONS]}
          />
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
