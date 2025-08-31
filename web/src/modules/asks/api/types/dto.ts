import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus = "new" | "in_progress" | "completed" | "cancelled";
export const validAskStatuses: AskStatus[] = ["new", "in_progress", "completed", "cancelled"];

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
  }
  