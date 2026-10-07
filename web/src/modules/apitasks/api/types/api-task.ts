export const API_TASK_KINDS = [
  "sku-slices.skugr-run-today",
  "sku-slices.post-corrections.run",
  "slice-compensation.run",
  "skugrs.fill-skus",
  "grabo-skus.sync",
  "arts.btrade-stock-update-all",
  "dels.artikuls-update-all",
  "pallet-groups.recalculate-pallets-sectors",
  "blocks.recalculate-zones-sectors",
  "poses.populate-missing-data",
  "skus.fix-incorrect-sku-data",
  "skus.delete-konk-invalid",
  "skus.delete-not-in-any-skugr",
  "arts.delete-without-latest-marker",
] as const;

export type ApiTaskKind = (typeof API_TASK_KINDS)[number];

export type ApiTaskStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "expired";

export type ApiTaskPhase =
  | "queued"
  | "preparing"
  | "running"
  | "finalizing";

export type ApiTaskParams = Record<string, unknown>;

export interface CreateApiTaskBody {
  kind: ApiTaskKind;
  params?: ApiTaskParams;
}

export interface ApiTaskDto {
  taskId: string;
  kind: ApiTaskKind;
  status: ApiTaskStatus;
  phase: ApiTaskPhase;
  progress: number;
  queuePosition: number | null;
  message?: string;
  result?: unknown;
  error?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  pollIntervalMs?: number;
}

export interface CreateApiTaskResult extends ApiTaskDto {
  pollIntervalMs: number;
}

export interface StartApiTaskInput {
  kind: ApiTaskKind;
  params?: ApiTaskParams;
  /** Human label for UI; falls back to kind label. */
  title?: string;
}
