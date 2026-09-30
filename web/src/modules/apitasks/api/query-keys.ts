export const apitasksQueryKeys = {
  all: ["apitasks"] as const,
  detail: (taskId: string) => ["apitasks", taskId] as const,
};
