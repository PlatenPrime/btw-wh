import { cn } from "@/lib/utils";
import type { AskStatus } from "@/modules/asks/api/types/dto";

export function AskStatusBage({ statusText }: { statusText: AskStatus }) {
  const statusConfig: Record<AskStatus, { style: string; text: string }> = {
    new: {
      style: "border-success/40 bg-success/15 text-success",
      text: "новий",
    },
    processing: {
      style: "border-warning/40 bg-warning/15 text-warning-foreground",
      text: "в процесі",
    },
    completed: {
      style: "border-border bg-muted/60 text-muted-foreground",
      text: "завершено",
    },
    solved: {
      style: "border-border bg-muted/60 text-muted-foreground",
      text: "завершено",
    },
    rejected: {
      style: "border-destructive/40 bg-destructive/15 text-destructive",
      text: "відмовлено",
    },
    fail: {
      style: "border-destructive/40 bg-destructive/15 text-destructive",
      text: "відмовлено",
    },
  };

  return (
    <div
      className={cn(
        statusConfig[statusText].style,
        "flex w-fit items-center justify-start rounded-md px-2 py-0.5",
      )}
    >
      <span className="text-center text-xs font-semibold">
        {statusConfig[statusText].text}
      </span>
    </div>
  );
}
