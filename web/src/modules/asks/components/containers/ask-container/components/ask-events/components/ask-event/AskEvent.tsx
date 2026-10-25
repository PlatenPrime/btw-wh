import { MetricChip } from "@/components/shared/elements";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { CalendarClock } from "lucide-react";
import { ASK_EVENT_META } from "../../constants/askEventMeta";

interface AskEventProps {
  event: AskEvent;
}

export function AskEventComponent({ event }: AskEventProps) {
  const meta = ASK_EVENT_META[event.eventName];
  const IconComponent = meta?.icon ?? CalendarClock;
  const tone = meta?.tone ?? "muted";
  const description =
    meta?.buildDescription(event) ??
    `${event.userData?.fullname ?? "Користувач"} зафіксував подію.`;

  return (
    <MetricChip
      icon={IconComponent}
      tone={tone}
      label={formatDate(event.date)}
      value={description}
      className="w-full"
    />
  );
}
