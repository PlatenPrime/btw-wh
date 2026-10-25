import { cn } from "@/lib/utils";
import type { ApiTaskStatus } from "@/modules/apitasks/api/types";
import {
  getApiTaskStatusBadgeLabel,
  getApiTaskStatusTone,
} from "@/modules/apitasks/utils/labels";
import { Loader2 } from "lucide-react";

const TONE_STYLES = {
  info: "border-info/40 bg-info/15 text-info",
  success: "border-success/40 bg-success/15 text-success",
  edit: "border-edit/40 bg-edit/15 text-edit",
  warning: "border-warning/40 bg-warning/15 text-warning-foreground",
  primary: "border-primary/40 bg-primary/15 text-primary",
  destructive: "border-destructive/40 bg-destructive/15 text-destructive",
  muted: "border-border bg-muted/60 text-muted-foreground",
} as const;

interface ApiTaskStatusBadgeProps {
  status: ApiTaskStatus;
  className?: string;
}

export function ApiTaskStatusBadge({
  status,
  className,
}: ApiTaskStatusBadgeProps) {
  const tone = getApiTaskStatusTone(status);
  const isActive = status === "queued" || status === "running";

  return (
    <div
      className={cn(
        TONE_STYLES[tone],
        "flex w-fit items-center justify-start gap-1.5 rounded-md border px-2 py-0.5",
        className,
      )}
    >
      {isActive ? (
        <Loader2 className="size-3 shrink-0 animate-spin" aria-hidden />
      ) : null}
      <span className="text-center text-xs font-semibold">
        {getApiTaskStatusBadgeLabel(status)}
      </span>
    </div>
  );
}
