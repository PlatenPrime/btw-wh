import { cn } from "@/lib/utils";
import type { AskStatus } from "@/modules/asks/api/types/dto";

export function AskStatusBage({ statusText }: { statusText: AskStatus }) {
  const statusConfig: Record<AskStatus, { style: string; text: string }> = {
    new: {
      style:
        "border border-yellow-500/80 bg-yellow-500/10 text-yellow-900 dark:text-yellow-200",
      text: "новий",
    },

    completed: {
      style:
        "border border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      text: "завершено",
    },
    solved: {
      style:
        "border border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      text: "завершено",
    },
    rejected: {
      style:
        "border border-rose-500/50 bg-rose-500/10 text-rose-900 dark:text-rose-200",
      text: "відмовлено",
    },
    fail: {
      style:
        "border border-rose-500/50 bg-rose-500/10 text-rose-900 dark:text-rose-200",
      text: "відмовлено",
    },
  };

  return (
    <div
      className={cn(
        statusConfig[statusText].style,
        "flex items-center justify-start rounded-md px-1 w-20",
      )}
    >
      <span className="w-18 text-center text-xs font-semibold">
        {statusConfig[statusText].text}
      </span>
    </div>
  );
}
