import { cn } from "@/lib/utils";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { CalendarClock } from "lucide-react";
import { ASK_EVENT_META } from "../../constants/askEventMeta";

interface AskEventProps {
  event: AskEvent;
  index: number;
}

export function AskEventComponent({ event, index }: AskEventProps) {
  const meta = ASK_EVENT_META[event.eventName];
  const IconComponent = meta?.icon ?? CalendarClock;

  return (
    <div
      key={event._id ?? `${event.eventName}-${event.date}-${index}`}
      className={cn(
        "rounded-md border px-2 py-1.5",
        meta?.accentClass ?? "border-slate-200 bg-slate-50",
      )}
    >
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center gap-2">
          <IconComponent className={cn("h-4 w-4", meta?.iconClass)} />
        </div>
        <span className="text-muted-foreground text-sm">
          {formatDate(event.date)}
        </span>
      </div>
      <p className="text-foreground text-sm">
        {meta?.buildDescription(event) ??
          `${event.userData?.fullname ?? "Користувач"} зафіксував подію.`}
      </p>
    </div>
  );
}
