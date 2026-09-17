import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import {
  cancelExcelJob,
  createExcelJob,
  getExcelJob,
  listExcelJobs,
} from "@/modules/excel-jobs/api/services";
import type {
  ExcelJobDto,
  ExcelJobParams,
  StartExcelJobInput,
} from "@/modules/excel-jobs/api/types";
import type {
  ExcelJobsContextValue,
  TrackedExcelJob,
} from "@/modules/excel-jobs/types/tracked-job";
import { startExcelJobFileDownload } from "@/modules/excel-jobs/utils/download";
import { getExcelJobKindLabel } from "@/modules/excel-jobs/utils/labels";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

const ExcelJobsContext = createContext<ExcelJobsContextValue | null>(null);

const DEFAULT_POLL_MS = 1000;
const TOKEN_REFRESH_MS = 4 * 60 * 1000;
const ACTIVE_STATUSES = ["queued", "running", "ready"] as const;
const EXCEL_REPORTS_PATH = "/sku/excel-reports";

function toTracked(
  job: ExcelJobDto,
  opts?: {
    title?: string;
    params?: ExcelJobParams;
    pollIntervalMs?: number;
    downloaded?: boolean;
  },
): TrackedExcelJob {
  return {
    job,
    kind: job.kind,
    title: opts?.title ?? getExcelJobKindLabel(job.kind),
    params: opts?.params ?? {},
    pollIntervalMs: opts?.pollIntervalMs ?? job.pollIntervalMs ?? DEFAULT_POLL_MS,
    downloaded: opts?.downloaded ?? false,
    readyAt: job.status === "ready" ? Date.now() : null,
  };
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  if (error instanceof Error) return error.message;
  return "Невідома помилка";
}

function withLocalError(
  tracked: TrackedExcelJob,
  error: string,
): TrackedExcelJob {
  return {
    ...tracked,
    job: {
      ...tracked.job,
      status: "failed",
      error,
    },
  };
}

function toastGoToReports() {
  return {
    label: "До звітів",
    onClick: () => {
      // HashRouter: path lives in hash, not pathname
      window.location.hash = EXCEL_REPORTS_PATH;
    },
  };
}

interface ExcelJobsProviderProps {
  children: ReactNode;
}

export function ExcelJobsProvider({ children }: ExcelJobsProviderProps) {
  const { isAuthenticated, hasRole, isLoading: isAuthLoading } = useAuth();
  const canUseExcelJobs =
    isAuthenticated && !isAuthLoading && hasRole(RoleType.ADMIN);

  const [jobs, setJobs] = useState<TrackedExcelJob[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

  const pollTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const downloadedIdsRef = useRef<Set<string>>(new Set());

  const clearPoll = useCallback((jobId: string) => {
    const timer = pollTimersRef.current.get(jobId);
    if (timer) {
      clearTimeout(timer);
      pollTimersRef.current.delete(jobId);
    }
  }, []);

  const clearAllPolls = useCallback(() => {
    for (const timer of pollTimersRef.current.values()) {
      clearTimeout(timer);
    }
    pollTimersRef.current.clear();
  }, []);

  const upsertJob = useCallback((tracked: TrackedExcelJob) => {
    setJobs((prev) => {
      const index = prev.findIndex((item) => item.job.jobId === tracked.job.jobId);
      if (index === -1) return [tracked, ...prev];
      const next = [...prev];
      next[index] = tracked;
      return next;
    });
  }, []);

  const removeJob = useCallback(
    (jobId: string) => {
      clearPoll(jobId);
      setJobs((prev) => prev.filter((item) => item.job.jobId !== jobId));
    },
    [clearPoll],
  );

  const triggerDownload = useCallback(
    async (tracked: TrackedExcelJob, forceRefreshToken: boolean) => {
      if (downloadedIdsRef.current.has(tracked.job.jobId) && !forceRefreshToken) {
        return;
      }

      let token = tracked.job.downloadToken;
      let fileName = tracked.job.fileName;
      let sizeBytes = tracked.job.sizeBytes;
      let job = tracked.job;

      const needsRefresh =
        forceRefreshToken ||
        !token ||
        (tracked.readyAt != null &&
          Date.now() - tracked.readyAt > TOKEN_REFRESH_MS);

      if (needsRefresh) {
        job = await getExcelJob(tracked.job.jobId);
        token = job.downloadToken;
        fileName = job.fileName;
        sizeBytes = job.sizeBytes;
        upsertJob({
          ...tracked,
          job,
          readyAt: tracked.readyAt ?? Date.now(),
        });
      }

      if (!token) {
        upsertJob(
          withLocalError(
            tracked,
            "Немає токена для завантаження. Спробуйте ще раз.",
          ),
        );
        toast.error("Немає токена для завантаження", {
          description: fileName ?? tracked.title,
          action: toastGoToReports(),
        });
        return;
      }

      startExcelJobFileDownload(job.jobId, token);
      downloadedIdsRef.current.add(job.jobId);

      upsertJob({
        ...tracked,
        job: { ...job, downloadToken: token, fileName, sizeBytes },
        downloaded: true,
        readyAt: tracked.readyAt ?? Date.now(),
      });

      toast.success("Завантаження розпочато", {
        description: fileName ?? tracked.title,
      });
    },
    [upsertJob],
  );

  const schedulePoll = useCallback(
    (jobId: string) => {
      clearPoll(jobId);

      const tick = async () => {
        const current = jobsRef.current.find((item) => item.job.jobId === jobId);
        if (!current) return;

        try {
          const job = await getExcelJob(jobId);
          const next: TrackedExcelJob = {
            ...current,
            job,
            pollIntervalMs:
              job.pollIntervalMs ?? current.pollIntervalMs ?? DEFAULT_POLL_MS,
            readyAt:
              job.status === "ready"
                ? (current.readyAt ?? Date.now())
                : current.readyAt,
          };
          upsertJob(next);

          if (job.status === "ready") {
            clearPoll(jobId);
            if (!downloadedIdsRef.current.has(jobId)) {
              await triggerDownload(next, false);
            }
            return;
          }

          if (
            job.status === "failed" ||
            job.status === "cancelled" ||
            job.status === "expired"
          ) {
            clearPoll(jobId);
            if (job.status === "failed") {
              toast.error("Помилка формування Excel", {
                description: job.error ?? next.title,
                action: toastGoToReports(),
              });
            }
            return;
          }

          const delay = next.pollIntervalMs;
          const timer = setTimeout(() => {
            void tick();
          }, delay);
          pollTimersRef.current.set(jobId, timer);
        } catch (error) {
          clearPoll(jobId);
          const currentJob = jobsRef.current.find(
            (item) => item.job.jobId === jobId,
          );
          if (currentJob) {
            upsertJob(withLocalError(currentJob, getErrorMessage(error)));
          }
          toast.error("Помилка опитування Excel job", {
            description: getErrorMessage(error),
            action: toastGoToReports(),
          });
        }
      };

      const current = jobsRef.current.find((item) => item.job.jobId === jobId);
      const delay = current?.pollIntervalMs ?? DEFAULT_POLL_MS;
      const timer = setTimeout(() => {
        void tick();
      }, delay);
      pollTimersRef.current.set(jobId, timer);
    },
    [clearPoll, triggerDownload, upsertJob],
  );

  const startJob = useCallback(
    async (input: StartExcelJobInput): Promise<ExcelJobDto | null> => {
      if (!canUseExcelJobs) {
        toast.error("Недостатньо прав для Excel");
        return null;
      }

      setIsStarting(true);
      try {
        const created = await createExcelJob({
          kind: input.kind,
          params: input.params ?? {},
        });
        const tracked = toTracked(created, {
          title: input.title,
          params: input.params ?? {},
          pollIntervalMs: created.pollIntervalMs ?? DEFAULT_POLL_MS,
        });
        upsertJob(tracked);
        schedulePoll(created.jobId);
        toast.success("Excel поставлено в чергу", {
          description: tracked.title,
          action: toastGoToReports(),
        });
        return created;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          try {
            const active = await listExcelJobs({
              status: [...ACTIVE_STATUSES],
            });
            for (const job of active) {
              const existing = jobsRef.current.find(
                (item) => item.job.jobId === job.jobId,
              );
              const tracked = toTracked(job, {
                title: existing?.title,
                params: existing?.params,
                pollIntervalMs: existing?.pollIntervalMs,
                downloaded: existing?.downloaded,
              });
              upsertJob(tracked);
              if (job.status === "queued" || job.status === "running") {
                schedulePoll(job.jobId);
              }
            }
          } catch {
            // list may already be in store
          }
          toast.error("Ліміт активних Excel (2)", {
            description: "Скасуйте одну задачу або дочекайтесь завершення",
            action: toastGoToReports(),
          });
          return null;
        }

        toast.error("Не вдалося поставити Excel", {
          description: getErrorMessage(error),
        });
        throw error;
      } finally {
        setIsStarting(false);
      }
    },
    [canUseExcelJobs, schedulePoll, upsertJob],
  );

  const cancelJob = useCallback(
    async (jobId: string) => {
      const existing = jobsRef.current.find((item) => item.job.jobId === jobId);
      try {
        const job = await cancelExcelJob(jobId);
        clearPoll(jobId);
        upsertJob(
          toTracked(job, {
            title: existing?.title,
            params: existing?.params,
          }),
        );
        toast.success("Excel задачу скасовано");
      } catch (error) {
        if (existing) {
          upsertJob(withLocalError(existing, getErrorMessage(error)));
        }
        toast.error("Не вдалося скасувати", {
          description: getErrorMessage(error),
        });
      }
    },
    [clearPoll, upsertJob],
  );

  const retryJob = useCallback(
    async (jobId: string) => {
      const existing = jobsRef.current.find((item) => item.job.jobId === jobId);
      if (!existing) return;
      removeJob(jobId);
      await startJob({
        kind: existing.kind,
        params: existing.params,
        title: existing.title,
      });
    },
    [removeJob, startJob],
  );

  const dismissJob = useCallback(
    (jobId: string) => {
      removeJob(jobId);
      downloadedIdsRef.current.delete(jobId);
    },
    [removeJob],
  );

  const downloadJob = useCallback(
    async (jobId: string) => {
      const existing = jobsRef.current.find((item) => item.job.jobId === jobId);
      if (!existing || existing.job.status !== "ready") return;
      downloadedIdsRef.current.delete(jobId);
      await triggerDownload(existing, true);
    },
    [triggerDownload],
  );

  useEffect(() => {
    if (!canUseExcelJobs) {
      clearAllPolls();
      setJobs([]);
      downloadedIdsRef.current.clear();
      return;
    }

    let cancelled = false;

    const restore = async () => {
      try {
        const active = await listExcelJobs({ status: [...ACTIVE_STATUSES] });
        if (cancelled) return;

        for (const job of active) {
          const tracked = toTracked(job);
          upsertJob(tracked);
          if (job.status === "queued" || job.status === "running") {
            schedulePoll(job.jobId);
          }
        }
      } catch {
        // silent — user may not have access mid-session
      }
    };

    void restore();

    return () => {
      cancelled = true;
      clearAllPolls();
    };
  }, [canUseExcelJobs, clearAllPolls, schedulePoll, upsertJob]);

  const value = useMemo<ExcelJobsContextValue>(
    () => ({
      jobs,
      isStarting,
      startJob,
      cancelJob,
      retryJob,
      dismissJob,
      downloadJob,
    }),
    [
      jobs,
      isStarting,
      startJob,
      cancelJob,
      retryJob,
      dismissJob,
      downloadJob,
    ],
  );

  return (
    <ExcelJobsContext.Provider value={value}>
      {children}
    </ExcelJobsContext.Provider>
  );
}

export function useExcelJobs(): ExcelJobsContextValue {
  const context = useContext(ExcelJobsContext);
  if (!context) {
    throw new Error("useExcelJobs must be used within ExcelJobsProvider");
  }
  return context;
}

export function useStartExcelJob() {
  const { startJob, isStarting } = useExcelJobs();
  return { startJob, isStarting };
}
