import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;

export interface PullPosition {
  posId: string;
  artikul: string;
  nameukr?: string;
  currentQuant: number;
  currentBoxes: number;
  plannedQuant: number | null;
  totalRequestedQuant: number | null;
  alreadyPulledQuant: number;
  alreadyPulledBoxes: number;
  askId: string;
  askerData: AskUserData;
}

export interface Pull {
  palletId: string;
  palletTitle: string;
  sector: number;
  rowTitle: string;
  positions: PullPosition[];
  totalAsks: number;
}

export interface PullsResponsePayload {
  pulls: Pull[];
  totalPulls: number;
  totalAsks: number;
}

export interface PullsResponse {
  success: boolean;
  message: string;
  data: PullsResponsePayload;
}

