import type { FillSkugrSkusStats } from "@/modules/skugrs/api/types";

export type AirClientSkugrRowStatus =
  | "pending"
  | "capturing"
  | "saving"
  | "done"
  | "error";

export interface AirClientSkugrRowState {
  status: AirClientSkugrRowStatus;
  pageIndex?: number;
  productsOnPage?: number;
  stats?: FillSkugrSkusStats;
  message?: string;
  code?: string;
}

export interface AirClientSkugrFillSummary {
  total: number;
  done: number;
  error: number;
  created: number;
  linkedExisting: number;
}
