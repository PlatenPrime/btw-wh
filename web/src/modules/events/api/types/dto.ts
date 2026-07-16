import type { PaginatedResponse } from "@/types/api";

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
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type EventsListResponse = PaginatedResponse<EventDto>;
