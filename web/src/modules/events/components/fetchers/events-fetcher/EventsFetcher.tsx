import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useEventsQuery } from "@/modules/events/api/hooks/queries/useEventsQuery";
import type { EventsListResponse, EventType } from "@/modules/events/api/types";
import { useEventsParams } from "@/modules/events/hooks/useEventsParams";
import type { ComponentType } from "react";

interface EventsFetcherProps {
  ContainerComponent: ComponentType<{
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
  }>;
  SkeletonComponent: ComponentType;
}

export function EventsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: EventsFetcherProps) {
  const {
    selectedDate,
    dateString,
    page,
    limit,
    department,
    type,
    setDate,
    setPage,
    setLimit,
    setDepartment,
    setType,
  } = useEventsParams();

  const eventsQuery = useEventsQuery({
    date: dateString,
    page,
    limit,
    department: department || undefined,
    type: type || undefined,
  });

  if (eventsQuery.isLoading) return <SkeletonComponent />;

  if (eventsQuery.error)
    return (
      <ErrorDisplay
        error={eventsQuery.error}
        title="Помилка завантаження подій"
        description="Не вдалося завантажити журнал подій для обраної дати"
      />
    );

  if (!eventsQuery.data)
    return <LoadingNoData description="Немає даних для відображення" />;

  return (
    <DataRefetchOverlay
      isFetching={eventsQuery.isFetching}
      isLoading={eventsQuery.isLoading}
    >
      <ContainerComponent
        data={eventsQuery.data}
        isFetching={eventsQuery.isFetching}
        selectedDate={selectedDate}
        page={page}
        limit={limit}
        department={department}
        type={type}
        setDate={setDate}
        setPage={setPage}
        setLimit={setLimit}
        setDepartment={setDepartment}
        setType={setType}
      />
    </DataRefetchOverlay>
  );
}
