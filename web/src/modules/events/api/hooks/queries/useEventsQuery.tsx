import { useDebounce } from "@/hooks/useDebounce";
import { getEvents } from "@/modules/events/api/services/queries/getEvents";
import type { EventsListResponse } from "@/modules/events/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { endOfDay, startOfDay } from "date-fns";

export interface UseEventsQueryParams {
  date: string;
  page: number;
  limit: number;
  enabled?: boolean;
}

export function useEventsQuery({
  date,
  page,
  limit,
  enabled = true,
}: UseEventsQueryParams) {
  const debouncedDate = useDebounce(date, 500);

  return useQuery<EventsListResponse>({
    queryKey: ["events", { date: debouncedDate, page, limit }],
    queryFn: ({ signal }) => {
      const selectedDate = new Date(`${debouncedDate}T00:00:00`);

      return getEvents({
        from: startOfDay(selectedDate).toISOString(),
        to: endOfDay(selectedDate).toISOString(),
        page,
        limit,
        signal,
      });
    },
    placeholderData: keepPreviousData,
    enabled: enabled && !!debouncedDate,
    staleTime: 2 * 60 * 1000,
  });
}
