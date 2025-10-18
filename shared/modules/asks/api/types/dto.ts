import type { User } from "@shared/modules/auth";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus = "new" | "completed" | "rejected" | "fail" | "solved";
export const validAskStatuses: AskStatus[] = [
  "new",
  "completed",
  "rejected",
  "fail",
  "solved",
];

export interface AskDto {
  _id: string;
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
  askerData: AskUserData;
  solver: string;
  solverData?: AskUserData;
  status: AskStatus;
  actions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
  newCount: number;
  completedCount: number;
  rejectedCount: number;
}

export interface GetAskByIdResponse {
  message: string;
  data: AskDto;
}
