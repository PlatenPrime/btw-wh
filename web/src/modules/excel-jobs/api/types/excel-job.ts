export const EXCEL_JOB_KINDS = [
  "sku-catalog-new-since",
  "sku-catalog-invalid",
  "sku-konk-stock",
  "sku-konk-sales",
  "sku-skugr-stock",
  "sku-skugr-sales",
  "sku-one-stock",
  "sku-one-sales",
  "art-stock",
  "art-sales",
  "analog-comparison",
  "analog-sales-comparison",
  "konk-btrade-comparison",
  "konk-btrade-sales-comparison",
  "arts-export",
  "arts-export-with-stocks",
  "arts-export-keys",
  "poses-export-stocks",
  "zones-export",
  "grabo-skus",
] as const;

export type ExcelJobKind = (typeof EXCEL_JOB_KINDS)[number];

export type ExcelJobStatus =
  | "queued"
  | "running"
  | "ready"
  | "failed"
  | "cancelled"
  | "expired";

export type ExcelJobPhase =
  | "queued"
  | "loading"
  | "building"
  | "finalizing";

export type ExcelJobParams = Record<string, unknown>;

export interface CreateExcelJobBody {
  kind: ExcelJobKind;
  params?: ExcelJobParams;
}

export interface ExcelJobDto {
  jobId: string;
  kind: ExcelJobKind;
  status: ExcelJobStatus;
  phase: ExcelJobPhase;
  progress: number;
  queuePosition: number | null;
  fileName?: string;
  sizeBytes?: number;
  downloadToken?: string;
  error?: string;
  expiresAt: string;
  createdAt: string;
  pollIntervalMs?: number;
}

export interface CreateExcelJobResult extends ExcelJobDto {
  pollIntervalMs: number;
}

export interface StartExcelJobInput {
  kind: ExcelJobKind;
  params?: ExcelJobParams;
  /** Human label for panel; falls back to kind label. */
  title?: string;
}
