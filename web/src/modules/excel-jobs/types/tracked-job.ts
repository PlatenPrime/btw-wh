import type {
  ExcelJobDto,
  ExcelJobKind,
  ExcelJobParams,
  StartExcelJobInput,
} from "@/modules/excel-jobs/api/types";

export interface TrackedExcelJob {
  job: ExcelJobDto;
  title: string;
  kind: ExcelJobKind;
  params: ExcelJobParams;
  pollIntervalMs: number;
  /** True after native download was triggered for this ready job. */
  downloaded: boolean;
  /** Timestamp when status first became ready (ms). */
  readyAt: number | null;
}

export interface ExcelJobsContextValue {
  jobs: TrackedExcelJob[];
  isPanelOpen: boolean;
  isStarting: boolean;
  setPanelOpen: (open: boolean) => void;
  startJob: (input: StartExcelJobInput) => Promise<ExcelJobDto | null>;
  cancelJob: (jobId: string) => Promise<void>;
  retryJob: (jobId: string) => Promise<void>;
  dismissJob: (jobId: string) => void;
  downloadJob: (jobId: string) => Promise<void>;
}
