import type {
  ApiTaskDto,
  ApiTaskKind,
  ApiTaskParams,
  StartApiTaskInput,
} from "@/modules/apitasks/api/types";

export interface TrackedApiTask {
  task: ApiTaskDto;
  title: string;
  kind: ApiTaskKind;
  params: ApiTaskParams;
  pollIntervalMs: number;
}

export interface ApiTasksContextValue {
  tasks: TrackedApiTask[];
  isStarting: boolean;
  startTask: (input: StartApiTaskInput) => Promise<ApiTaskDto | null>;
  cancelTask: (taskId: string) => Promise<void>;
  retryTask: (taskId: string) => Promise<void>;
  dismissTask: (taskId: string) => void;
}
