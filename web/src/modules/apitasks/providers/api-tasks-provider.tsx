import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { apitasksQueryKeys } from "@/modules/apitasks/api/query-keys";
import {
  cancelApiTask,
  createApiTask,
  getApiTask,
  listApiTasks,
} from "@/modules/apitasks/api/services";
import type {
  ApiTaskDto,
  ApiTaskParams,
  StartApiTaskInput,
} from "@/modules/apitasks/api/types";
import type {
  ApiTasksContextValue,
  TrackedApiTask,
} from "@/modules/apitasks/types/tracked-task";
import { getInvalidateQueryKeys } from "@/modules/apitasks/utils/invalidate-on-complete";
import { getApiTaskKindLabel } from "@/modules/apitasks/utils/labels";
import { useQueryClient } from "@tanstack/react-query";
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

const ApiTasksContext = createContext<ApiTasksContextValue | null>(null);

const DEFAULT_POLL_MS = 1000;
const ACTIVE_STATUSES = ["queued", "running"] as const;
const API_TASKS_PATH = "/api-tasks";

function toTracked(
  task: ApiTaskDto,
  opts?: {
    title?: string;
    params?: ApiTaskParams;
    pollIntervalMs?: number;
  },
): TrackedApiTask {
  return {
    task,
    kind: task.kind,
    title: opts?.title ?? getApiTaskKindLabel(task.kind),
    params: opts?.params ?? {},
    pollIntervalMs:
      opts?.pollIntervalMs ?? task.pollIntervalMs ?? DEFAULT_POLL_MS,
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
  tracked: TrackedApiTask,
  error: string,
): TrackedApiTask {
  return {
    ...tracked,
    task: {
      ...tracked.task,
      status: "failed",
      error,
    },
  };
}

function toastOpenTasks(taskId?: string) {
  return {
    label: "Відкрити задачу",
    onClick: () => {
      const path =
        taskId != null && taskId.length > 0
          ? `${API_TASKS_PATH}/${encodeURIComponent(taskId)}`
          : API_TASKS_PATH;
      window.location.hash = path;
    },
  };
}

interface ApiTasksProviderProps {
  children: ReactNode;
}

export function ApiTasksProvider({ children }: ApiTasksProviderProps) {
  const { isAuthenticated, hasRole, isLoading: isAuthLoading } = useAuth();
  const queryClient = useQueryClient();
  const canUseApiTasks =
    isAuthenticated && !isAuthLoading && hasRole(RoleType.EDITOR);

  const [tasks, setTasks] = useState<TrackedApiTask[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  const pollTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const syncTaskQueries = useCallback(
    (task: ApiTaskDto) => {
      // Only patch detail cache. Never seed/replace the list with a partial
      // active-only snapshot — list comes from full GET via invalidate.
      queryClient.setQueryData(apitasksQueryKeys.detail(task.taskId), task);
      queryClient.setQueryData<ApiTaskDto[]>(apitasksQueryKeys.all, (prev) => {
        if (!prev) return prev;
        const index = prev.findIndex((item) => item.taskId === task.taskId);
        if (index === -1) return [task, ...prev];
        const next = [...prev];
        next[index] = task;
        return next;
      });
    },
    [queryClient],
  );

  const invalidateApiTasksQueries = useCallback(
    (taskId?: string) => {
      void queryClient.invalidateQueries({ queryKey: apitasksQueryKeys.all });
      if (taskId) {
        void queryClient.invalidateQueries({
          queryKey: apitasksQueryKeys.detail(taskId),
        });
      }
    },
    [queryClient],
  );

  const clearPoll = useCallback((taskId: string) => {
    const timer = pollTimersRef.current.get(taskId);
    if (timer) {
      clearTimeout(timer);
      pollTimersRef.current.delete(taskId);
    }
  }, []);

  const clearAllPolls = useCallback(() => {
    for (const timer of pollTimersRef.current.values()) {
      clearTimeout(timer);
    }
    pollTimersRef.current.clear();
  }, []);

  const upsertTask = useCallback(
    (tracked: TrackedApiTask) => {
      syncTaskQueries(tracked.task);
      setTasks((prev) => {
        const index = prev.findIndex(
          (item) => item.task.taskId === tracked.task.taskId,
        );
        if (index === -1) return [tracked, ...prev];
        const next = [...prev];
        next[index] = tracked;
        return next;
      });
    },
    [syncTaskQueries],
  );

  const removeTask = useCallback(
    (taskId: string) => {
      clearPoll(taskId);
      setTasks((prev) => prev.filter((item) => item.task.taskId !== taskId));
    },
    [clearPoll],
  );

  const invalidateForTask = useCallback(
    (tracked: TrackedApiTask) => {
      const keys = getInvalidateQueryKeys(tracked.kind, tracked.params);
      for (const queryKey of keys) {
        void queryClient.invalidateQueries({ queryKey });
      }
      invalidateApiTasksQueries(tracked.task.taskId);
    },
    [invalidateApiTasksQueries, queryClient],
  );

  const schedulePoll = useCallback(
    (taskId: string) => {
      clearPoll(taskId);

      const tick = async () => {
        const current = tasksRef.current.find(
          (item) => item.task.taskId === taskId,
        );
        if (!current) return;

        try {
          const task = await getApiTask(taskId);
          const next: TrackedApiTask = {
            ...current,
            task,
            pollIntervalMs:
              task.pollIntervalMs ?? current.pollIntervalMs ?? DEFAULT_POLL_MS,
          };
          upsertTask(next);

          if (task.status === "completed") {
            clearPoll(taskId);
            invalidateForTask(next);
            toast.success("Задачу завершено", {
              description: next.title,
              action: toastOpenTasks(taskId),
            });
            return;
          }

          if (
            task.status === "failed" ||
            task.status === "cancelled" ||
            task.status === "expired"
          ) {
            clearPoll(taskId);
            invalidateApiTasksQueries(taskId);
            if (task.status === "failed") {
              toast.error("Помилка задачі", {
                description: task.error ?? next.title,
                action: toastOpenTasks(taskId),
              });
            }
            return;
          }

          const delay = next.pollIntervalMs;
          const timer = setTimeout(() => {
            void tick();
          }, delay);
          pollTimersRef.current.set(taskId, timer);
        } catch (error) {
          clearPoll(taskId);
          const currentTask = tasksRef.current.find(
            (item) => item.task.taskId === taskId,
          );
          if (currentTask) {
            upsertTask(withLocalError(currentTask, getErrorMessage(error)));
          }
          toast.error("Помилка опитування задачі", {
            description: getErrorMessage(error),
            action: toastOpenTasks(taskId),
          });
        }
      };

      const current = tasksRef.current.find(
        (item) => item.task.taskId === taskId,
      );
      const delay = current?.pollIntervalMs ?? DEFAULT_POLL_MS;
      const timer = setTimeout(() => {
        void tick();
      }, delay);
      pollTimersRef.current.set(taskId, timer);
    },
    [clearPoll, invalidateApiTasksQueries, invalidateForTask, upsertTask],
  );

  const startTask = useCallback(
    async (input: StartApiTaskInput): Promise<ApiTaskDto | null> => {
      if (!canUseApiTasks) {
        toast.error("Недостатньо прав для задач");
        return null;
      }

      setIsStarting(true);
      try {
        const created = await createApiTask({
          kind: input.kind,
          params: input.params ?? {},
        });
        const tracked = toTracked(created, {
          title: input.title,
          params: input.params ?? {},
          pollIntervalMs: created.pollIntervalMs ?? DEFAULT_POLL_MS,
        });
        upsertTask(tracked);
        schedulePoll(created.taskId);
        invalidateApiTasksQueries(created.taskId);
        toast.success("Задачу прийнято", {
          description: tracked.title,
          action: toastOpenTasks(created.taskId),
        });
        return created;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          try {
            const active = await listApiTasks({
              status: [...ACTIVE_STATUSES],
            });
            for (const task of active) {
              const existing = tasksRef.current.find(
                (item) => item.task.taskId === task.taskId,
              );
              const tracked = toTracked(task, {
                title: existing?.title,
                params: existing?.params,
                pollIntervalMs: existing?.pollIntervalMs,
              });
              upsertTask(tracked);
              if (task.status === "queued" || task.status === "running") {
                schedulePoll(task.taskId);
              }
            }
            invalidateApiTasksQueries();
          } catch {
            // list may already be in store
          }
          toast.error("Ліміт активних задач (3)", {
            description: "Скасуйте одну задачу або дочекайтесь завершення",
            action: toastOpenTasks(),
          });
          return null;
        }

        if (axios.isAxiosError(error) && error.response?.status === 409) {
          toast.error("Така задача вже виконується", {
            description: getErrorMessage(error),
            action: toastOpenTasks(),
          });
          return null;
        }

        toast.error("Не вдалося поставити задачу", {
          description: getErrorMessage(error),
        });
        throw error;
      } finally {
        setIsStarting(false);
      }
    },
    [canUseApiTasks, invalidateApiTasksQueries, schedulePoll, upsertTask],
  );

  const cancelTask = useCallback(
    async (taskId: string) => {
      const existing = tasksRef.current.find(
        (item) => item.task.taskId === taskId,
      );
      try {
        const task = await cancelApiTask(taskId);
        clearPoll(taskId);
        upsertTask(
          toTracked(task, {
            title: existing?.title,
            params: existing?.params,
          }),
        );
        invalidateApiTasksQueries(taskId);
        toast.success("Задачу скасовано");
      } catch (error) {
        if (existing) {
          upsertTask(withLocalError(existing, getErrorMessage(error)));
        }
        toast.error("Не вдалося скасувати", {
          description: getErrorMessage(error),
        });
      }
    },
    [clearPoll, invalidateApiTasksQueries, upsertTask],
  );

  const retryTask = useCallback(
    async (taskId: string) => {
      const existing = tasksRef.current.find(
        (item) => item.task.taskId === taskId,
      );
      if (!existing) return;
      removeTask(taskId);
      await startTask({
        kind: existing.kind,
        params: existing.params,
        title: existing.title,
      });
    },
    [removeTask, startTask],
  );

  const dismissTask = useCallback(
    (taskId: string) => {
      removeTask(taskId);
    },
    [removeTask],
  );

  useEffect(() => {
    if (!canUseApiTasks) {
      clearAllPolls();
      setTasks([]);
      return;
    }

    let cancelled = false;

    const restore = async () => {
      try {
        const active = await listApiTasks({ status: [...ACTIVE_STATUSES] });
        if (cancelled) return;

        for (const task of active) {
          const tracked = toTracked(task);
          upsertTask(tracked);
          if (task.status === "queued" || task.status === "running") {
            schedulePoll(task.taskId);
          }
        }
        // Refresh full history list (restore only tracks active for polling)
        invalidateApiTasksQueries();
      } catch {
        // silent — user may not have access mid-session
      }
    };

    void restore();

    return () => {
      cancelled = true;
      clearAllPolls();
    };
  }, [
    canUseApiTasks,
    clearAllPolls,
    invalidateApiTasksQueries,
    schedulePoll,
    upsertTask,
  ]);

  const value = useMemo<ApiTasksContextValue>(
    () => ({
      tasks,
      isStarting,
      startTask,
      cancelTask,
      retryTask,
      dismissTask,
    }),
    [tasks, isStarting, startTask, cancelTask, retryTask, dismissTask],
  );

  return (
    <ApiTasksContext.Provider value={value}>{children}</ApiTasksContext.Provider>
  );
}

export function useApiTasks(): ApiTasksContextValue {
  const context = useContext(ApiTasksContext);
  if (!context) {
    throw new Error("useApiTasks must be used within ApiTasksProvider");
  }
  return context;
}

export function useStartApiTask() {
  const { startTask, isStarting } = useApiTasks();
  return { startTask, isStarting };
}
