import type { User } from "@/modules/auth/api/types";

export type AskUserData = Pick<User, "_id" | "fullname" | "telegram" | "photo">;

export interface IPullPosition {
  /** Unique identifier of the position (MongoDB ObjectId as string) */
  posId: string;
  /** Article number/identifier (product code) */
  artikul: string;
  /** Ukrainian name of the product (optional) */
  nameukr?: string;
  /** Current quantity available on the pallet */
  currentQuant: number;
  /** Current number of boxes available on the position */
  currentBoxes: number;
  /** Requested quantity to be pulled from this position (0 for asks without quant) */
  requestedQuant: number;
  /** ID of the ask that requests this position (MongoDB ObjectId as string) */
  askId: string;
  /** Data of the user who made the ask */
  askerData: AskUserData;
}

export interface IPull {
  /** Unique identifier of the pallet (MongoDB ObjectId as string) */
  palletId: string;
  /** Title/name of the pallet (e.g., "Pallet-42-5-2") */
  palletTitle: string;
  /** Sector number for sorting priority (0 if sector is null/undefined) */
  sector: number;
  /** Title/name of the row containing this pallet */
  rowTitle: string;
  /** Array of positions to be processed on this pallet */
  positions: IPullPosition[];
  /** Total number of unique asks involved in this pull */
  totalAsks: number;
}

export interface IPullsResponse {
  /** Array of calculated pulls, sorted by sector */
  pulls: IPull[];
  /** Total number of pulls */
  totalPulls: number;
  /** Total number of unique asks being processed */
  totalAsks: number;
}

export interface IProcessPullPositionRequest {
  /** ID of the ask that requests this position (MongoDB ObjectId string) */
  askId: string;
  /** Actual quantity to be pulled from the position (must be positive) */
  actualQuant: number;
  /** Actual number of boxes to be pulled from the position (must be >= 0) */
  actualBoxes: number;
  /** ID of the solver processing this position (MongoDB ObjectId string) */
  solverId: string;
}

export interface IProcessPullPositionResponse {
  /** ID of the processed position */
  positionId: string;
  /** ID of the pallet containing the position */
  palletId: string;
  /** Quantity that was actually extracted */
  actualQuant: number;
  /** Remaining quantity on the position after extraction (0 if empty) */
  remainingQuant: number;
  /** Total quantity processed for this ask so far (sum of all actualQuant from actions) */
  askProgress: number;
  /** Boolean indicating if the ask is now fully completed */
  askFullyProcessed: boolean;
  /** Original requested quantity from the ask (null if ask had no quant specified) */
  askRequestedQuant: number | null;
  /** Number of unique asks still remaining in this pull (excluding current ask if completed) */
  remainingAsksInPull: number;
  /** Full name of the worker who processed this position */
  solverName: string;
}

export interface GetPullsResponse {
  success: boolean;
  message: string;
  data: IPullsResponse;
}

export interface GetPullByPalletIdResponse {
  success: boolean;
  exists: boolean;
  message: string;
  data: IPull | null;
}

export interface ProcessPullPositionResponse {
  success: boolean;
  message: string;
  data: IProcessPullPositionResponse;
}

