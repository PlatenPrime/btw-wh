import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus = "new" | "processing" | "completed" | "rejected" | "fail" | "solved";
export const validAskStatuses: AskStatus[] = [
  "new",
  "processing",
  "completed",
  "rejected",
  "fail",
  "solved",
];

export type AskEventName = "create" | "pull" | "complete" | "reject";

export interface AskEventPullDetails {
  palletData: {
    _id: string;
    title: string;
  };
  quant: number;
  boxes: number;
}

export interface AskEvent {
  _id?: string;
  eventName: AskEventName;
  date: string;
  userData: AskUserData;
  pullDetails?: AskEventPullDetails;
}

export interface AskDto {
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: AskUserData;
  solver?: string;
  solverData?: AskUserData;
  status: AskStatus;
  pullQuant?: number;
  pullBox?: number;
  pullBoxes?: number;
  events: AskEvent[];
  actions?: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
  newCount: number;
  processingCount: number;
  completedCount: number;
  rejectedCount: number;
}

import type { EntityResponse } from "@/types/api";

export type GetAskByIdResponse = EntityResponse<AskDto>;
