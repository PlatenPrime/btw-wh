import { apiClient } from "@/lib/apiClient";
import type { EventsListResponse } from "@/modules/events/api/types";

export interface GetEventsParams {
  from: string;
  to: string;
  page: number;
  limit: number;
  department?: string;
  userId?: string;
  signal?: AbortSignal;
}

export const getEvents = async ({
  from,
  to,
  page,
  limit,
  department,
  userId,
  signal,
}: GetEventsParams): Promise<EventsListResponse> => {
  const query = new URLSearchParams({
    from,
    to,
    page: String(page),
    limit: String(limit),
  });

  if (department) {
    query.set("department", department);
  }

  if (userId) {
    query.set("userId", userId);
  }

  const res = await apiClient.get<EventsListResponse>(
    `/events?${query.toString()}`,
    { signal },
  );

  return res.data;
};
