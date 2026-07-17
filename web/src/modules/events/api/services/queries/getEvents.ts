import { apiClient } from "@/lib/apiClient";
import type { EventsListResponse, EventType } from "@/modules/events/api/types";

export interface GetEventsParams {
  from: string;
  to: string;
  page: number;
  limit: number;
  department?: string;
  type?: EventType;
  userId?: string;
  signal?: AbortSignal;
}

export const getEvents = async ({
  from,
  to,
  page,
  limit,
  department,
  type,
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

  if (type) {
    query.set("type", type);
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
