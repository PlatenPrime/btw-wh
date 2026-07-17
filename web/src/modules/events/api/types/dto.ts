import type { PaginatedResponse } from "@/types/api";

export type EventType = "create" | "edit" | "delete" | "other";

export interface EventUserData {
  _id: string;
  fullname: string;
  telegram?: string;
  photo?: string;
}

export interface EventDto {
  _id: string;
  userId: string;
  userData: EventUserData;
  department: string;
  type?: EventType;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type EventsListResponse = PaginatedResponse<EventDto>;
