import { useDebounce } from "@/hooks/useDebounce";
import { getEvents } from "@/modules/events/api/services/queries/getEvents";
import type { EventsListResponse, EventType } from "@/modules/events/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { endOfDay, startOfDay } from "date-fns";

export interface UseEventsQueryParams {
  date: string;
  page: number;
  limit: number;
  department?: string;
  type?: EventType;
  enabled?: boolean;
}

export function useEventsQuery({
  date,
  page,
  limit,
  department,
  type,
  enabled = true,
}: UseEventsQueryParams) {
  const debouncedDate = useDebounce(date, 500);

  return useQuery<EventsListResponse>({
    queryKey: ["events", { date: debouncedDate, page, limit, department, type }],
    queryFn: ({ signal }) => {
      const selectedDate = new Date(`${debouncedDate}T00:00:00`);

      return getEvents({
        from: startOfDay(selectedDate).toISOString(),
        to: endOfDay(selectedDate).toISOString(),
        page,
        limit,
        department: department || undefined,
        type: type || undefined,
        signal,
      });
    },
    placeholderData: keepPreviousData,
    enabled: enabled && !!debouncedDate,
    staleTime: 2 * 60 * 1000,
  });
}
