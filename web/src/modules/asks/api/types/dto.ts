import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;
export type AskStatus = "new" | "in_progress" | "completed" | "cancelled";
export const validAskStatuses: AskStatus[] = ["new", "in_progress", "completed", "cancelled"];

export interface AskDto {
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
    createdAt: Date;
    updatedAt: Date;
  }

